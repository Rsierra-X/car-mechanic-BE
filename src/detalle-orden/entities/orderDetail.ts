import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Order} from "../../ordenes/entities/orden.entity";


@Entity('OrderDetails')
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, { nullable: false })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    orderId: number;

    @Column({ nullable: true })
    productoId: number;

    @Column({ nullable: true })
    servicioId: number;

    @Column({ type: 'int', nullable: true })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precioUnitario: number;

    @Column()
    tipo: 'producto' | 'servicio';
}