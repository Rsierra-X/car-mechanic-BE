import { Injectable, NotFoundException } from '@nestjs/common';
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

        const vehiculoDto = createOrderDto.vehiculo
        let vehiculoExistente = await this.vehiculoRepository.findOne({
            where: { Placa: vehiculoDto.Placa, ClienteID: createOrderDto.clienteId }
        });

        if (vehiculoExistente) {
            vehiculoExistente.Kilometraje = vehiculoDto.Kilometraje;
            vehiculoExistente.Color = vehiculoDto.Color;
            vehiculoExistente.Marca = vehiculoDto.Marca;
            vehiculoExistente.Modelo = vehiculoDto.Modelo;
            vehiculoExistente.Anio = vehiculoDto.Anio;
            await this.vehiculoRepository.save(vehiculoExistente);
        } else {
            const createVehiculo: CreateVehiculoDTO = {
                Anio: vehiculoDto.Anio,
                ClienteID: createOrderDto.clienteId,
                Color: vehiculoDto.Color,
                Kilometraje: vehiculoDto.Kilometraje,
                Marca: vehiculoDto.Marca,
                Modelo: vehiculoDto.Modelo,
                Placa: vehiculoDto.Placa
            }
            vehiculoExistente = await this.vehiculoService.findOrCreate(createVehiculo);
        }

        const nuevaOrdenStructure: Partial<Order> = {
            fecha: new Date(),
            clienteId: createOrderDto.clienteId,
            vehiculoId: vehiculoExistente.VehiculoID,
            manoDeObra: createOrderDto.manoDeObra || 0,
            abono: createOrderDto.abono || 0,
            total: createOrderDto.total || 0,
            estado: 'Pendiente',
        }

        const nuevaOrden = this.orderRepository.create(nuevaOrdenStructure);

        const savedOrder = await this.orderRepository.save(nuevaOrden);

        await Promise.all(
            createOrderDto.detalles.map((det: CreateOrderDetailDto) =>
                this.orderDetailService.create({ ...det, orderId: savedOrder.id })
            )
        );

        const ordenConDetalles = await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: ['detalles'],
        });

        if (!ordenConDetalles) {
            throw new NotFoundException('Orden no encontrada después de guardar');
        }

        return ordenConDetalles;
    }

    async updateEstado(id: number, nuevoEstado: string): Promise<Order> {
        const orden = await this.orderRepository.findOneBy({ id });
        if (!orden) throw new NotFoundException('Orden no encontrada');
        orden.estado = nuevoEstado;
        return await this.orderRepository.save(orden);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['cliente', 'vehiculo', 'detalles'],
            order: { fecha: 'DESC' },
        });
    }
}