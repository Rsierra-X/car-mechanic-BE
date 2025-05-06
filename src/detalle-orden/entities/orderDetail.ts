import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Order} from "../../ordenes/entities/orden.entity";
import {Producto} from "../../inventario/entities/producto.entity";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    orderId: number;

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'productId' })
    product: Producto;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;
}