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
        const { clienteId, vehiculo, detalles, manoDeObra, abono, total } = createOrderDto;

        const cliente = await this.clienteRepository.findOneBy({ ClienteID: clienteId });
        if (!cliente) throw new NotFoundException('Cliente no encontrado');

        let vehiculoExistente = await this.vehiculoRepository.findOne({
            where: { Placa: vehiculo.Placa, ClienteID: clienteId }
        });

        if (vehiculoExistente) {
            vehiculoExistente.Kilometraje = vehiculo.Kilometraje;
            vehiculoExistente.Color = vehiculo.Color;
            await this.vehiculoRepository.save(vehiculoExistente);
        } else {
            vehiculoExistente = await this.vehiculoService.findOrCreate({...vehiculo, ClienteID: clienteId});
        }

        const nuevaOrden = this.orderRepository.create({
            clienteId,
            cliente,
            vehiculoId: vehiculoExistente.VehiculoID,
            vehiculo: vehiculoExistente,
            fecha: new Date(),
            manoDeObra,
            abono,
            total,
            estado: 'Pendiente',
        });

        const savedOrder = await this.orderRepository.save(nuevaOrden);

        const detallesGuardados = detalles.map(det => this.detailRepository.create({
            ...det,
            orderId: savedOrder.id,
        }));
        await Promise.all(
            detalles.map((det: CreateOrderDetailDto) =>
                this.orderDetailService.create({ ...det, orderId: savedOrder.id })
            )
        );
        await this.detailRepository.save(detallesGuardados);

        return this.orderRepository.findOne({ where: { id: savedOrder.id }, relations: ['detalles'] });
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