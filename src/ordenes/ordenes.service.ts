import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from "./entities/orden.entity";
import {OrderDetail} from "../detalle-orden/entities/orderDetail";
import {Cliente} from "../clientes/entities/cliente.entity";
import {Producto} from "../inventario/entities/producto.entity";
import {CreateOrderDTO, UpdateOrderDTO} from "./dto/orden.dto";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Cliente)
        private clientRepository: Repository<Cliente>,
        @InjectRepository(Producto)
        private productRepository: Repository<Producto>,
    ) { }

    async create(orderDTO: CreateOrderDTO): Promise<Order> {
        const client = await this.clientRepository.findOneOrFail({ where: { ClienteID: orderDTO.clientId } });

        let total = orderDTO.laborCost;
        const orderDetails: OrderDetail[] = [];
        for (const detailDTO of orderDTO.orderDetails) {
            const product = await this.productRepository.findOneOrFail({ where: { ProductoID: detailDTO.productId } });
            if (!product) {
                throw new NotFoundException(`Product with id ${detailDTO.productId} not found`);
            }
            const orderDetail = this.orderDetailRepository.create({
                productId: detailDTO.productId,
                quantity: detailDTO.quantity,
                unitPrice: product.PrecioUnitario,
            });
            total += detailDTO.quantity * product.PrecioUnitario;
            orderDetails.push(orderDetail);
        }
        if (orderDTO.abono) {
            if (orderDTO.abono > total) {
                throw new Error('El abono no puede ser mayor que el total');
            }
        }


        const order = this.orderRepository.create({
            ...orderDTO,
            client,
            orderDetails,
            total,
        });


        return this.orderRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['client', 'orderDetails', 'orderDetails.product'],
        });
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOneOrFail({
            where: { id },
            relations: ['client', 'orderDetails', 'orderDetails.product'],
        });
    }

    async update(id: number, orderDTO: UpdateOrderDTO): Promise<Order> {
        const existingOrder = await this.orderRepository.findOneOrFail({
            where: { id },
            relations: ['client', 'orderDetails'],
        });

        if (orderDTO.orderDate) existingOrder.orderDate = orderDTO.orderDate;
        if (orderDTO.clientId) {
            existingOrder.clientId = orderDTO.clientId;
            existingOrder.client = await this.clientRepository.findOneOrFail({ where: { ClienteID: orderDTO.clientId } });
        }
        if (orderDTO.brand) existingOrder.brand = orderDTO.brand;
        if (orderDTO.type) existingOrder.type = orderDTO.type;
        if (orderDTO.plate) existingOrder.plate = orderDTO.plate;
        if (orderDTO.color) existingOrder.color = orderDTO.color;
        if (orderDTO.year) existingOrder.year = orderDTO.year;
        if (orderDTO.nextService) existingOrder.nextService = orderDTO.nextService;
        if (orderDTO.laborCost) existingOrder.laborCost = orderDTO.laborCost;
        if (orderDTO.abono) existingOrder.abono = orderDTO.abono;
        if (orderDTO.estado) existingOrder.estado = orderDTO.estado;


        if (orderDTO.orderDetails && orderDTO.orderDetails.length > 0) {
            await this.orderDetailRepository.remove(existingOrder.orderDetails);
            const newOrderDetails: OrderDetail[] = [];
            let total = existingOrder.laborCost;
            for (const detailDTO of orderDTO.orderDetails) {
                const product = await this.productRepository.findOneOrFail({ where: { ProductoID: detailDTO.productId } });
                const orderDetail = this.orderDetailRepository.create({
                    productId: detailDTO.productId,
                    quantity: detailDTO.quantity,
                    unitPrice: product.PrecioUnitario,
                    order: existingOrder,
                });
                total += detailDTO.quantity * product.PrecioUnitario;
                newOrderDetails.push(orderDetail);
            }
            existingOrder.orderDetails = newOrderDetails;
            existingOrder.total = total;
        }
        else {
            let total = existingOrder.laborCost;
            for (let detail of existingOrder.orderDetails) {
                const product = await this.productRepository.findOneOrFail({ where: { ProductoID: detail.productId } });
                total += detail.quantity * product.PrecioUnitario;
            }
            existingOrder.total = total;
        }
        if (orderDTO.abono) {
            if (orderDTO.abono > existingOrder.total) {
                throw new Error('El abono no puede ser mayor que el total');
            }
        }
        return this.orderRepository.save(existingOrder);
    }

    async remove(id: number): Promise<void> {
        const order = await this.orderRepository.findOneOrFail({ where: { id } });
        await this.orderRepository.remove(order);
    }
}