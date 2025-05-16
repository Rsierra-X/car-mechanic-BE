import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from "./entities/orden.entity";
import {OrderDetail} from "../detalle-orden/entities/orderDetail";
import {Cliente} from "../clientes/entities/cliente.entity";
import {Producto} from "../inventario/entities/producto.entity";
import {CreateOrderDto,UpdateOrderDto} from "./dto/orden.dto";
import {Vehiculo} from "../vehiculos/entities/vehiculos.entity";
import {VehiculoService} from "../vehiculos/vehiculos.service";
import {DetalleOrdenService} from "../detalle-orden/detalle-orden.service";
import {CreateOrderDetailDto} from "../detalle-orden/dto/order-detail.dto";
import {CreateVehiculoDTO} from "../vehiculos/dto/vehiculo.dto";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
        @InjectRepository(OrderDetail)
        private detailRepository: Repository<OrderDetail>,
        private vehiculoService: VehiculoService,
        private orderDetailService: DetalleOrdenService
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const cliente = await this.clienteRepository.findOneBy({ ClienteID: createOrderDto.clienteId });
        if (!cliente) throw new NotFoundException('Cliente no encontrado');

        // 1. Buscar o crear vehículo
        const vehiculoDto = createOrderDto.vehiculo;
        let vehiculo = await this.vehiculoRepository.findOne({
            where: {
                Placa: vehiculoDto.Placa,
                ClienteID: createOrderDto.clienteId
            }
        });

        if (vehiculo) {
            Object.assign(vehiculo, {
                Kilometraje: vehiculoDto.Kilometraje,
                Color: vehiculoDto.Color,
                Marca: vehiculoDto.Marca,
                Modelo: vehiculoDto.Modelo,
                Anio: vehiculoDto.Anio
            });
            await this.vehiculoRepository.save(vehiculo);
        } else {
            vehiculo = await this.vehiculoService.findOrCreate({
                ...vehiculoDto,
                ClienteID: createOrderDto.clienteId
            });
        }

        // 2. Crear la orden
        const nuevaOrden = this.orderRepository.create({
            fecha: new Date(),
            clienteId: createOrderDto.clienteId,
            vehiculoId: vehiculo.VehiculoID,
            manoDeObra: createOrderDto.manoDeObra || 0,
            abono: createOrderDto.abono || 0,
            total: createOrderDto.total || 0,
            estado: 'Pendiente'
        });

        const savedOrder = await this.orderRepository.save(nuevaOrden);

        for (const det of createOrderDto.detalles) {
            const detalleDto = new CreateOrderDetailDto();
            detalleDto.orderId = savedOrder.id;
            detalleDto.tipo = det.tipo;
            detalleDto.cantidad = det.cantidad;
            detalleDto.precioUnitario = det.precioUnitario;

            if (det.tipo === 'producto') {
                detalleDto.productoId = det.productoId;
            } else if (det.tipo === 'servicio') {
                detalleDto.servicioId = det.servicioId;
            }

            await this.orderDetailService.create(detalleDto);
        }

        // 4. Retornar la orden con sus detalles
        const ordenConDetalles = await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: ['detalles'],
        });

        if (!ordenConDetalles) {
            throw new NotFoundException('Orden no encontrada después de guardar');
        }

        return ordenConDetalles;
    }

    async updateEstado(id: number): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new NotFoundException(`Orden con ID ${id} no encontrada`);
        }

        switch (order.estado) {
            case 'Pendiente':
                order.estado = 'En Proceso';
                break;
            case 'En Proceso':
                order.estado = 'Entregada';
                break;
            default:
                throw new BadRequestException(`No se puede actualizar el estado desde ${order.estado}`);
        }

        return await this.orderRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['cliente', 'vehiculo', 'detalles'],
            order: { fecha: 'DESC' },
        });
    }
}