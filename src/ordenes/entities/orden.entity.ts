import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import {OrderDetail} from "../../detalle-orden/entities/orderDetail";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    orderDate: Date;

    @ManyToOne(() => Cliente, client => client.orders)
    @JoinColumn({ name: 'clientId' })
    client: Cliente;

    @Column()
    clientId: number;

    @Column()
    clientName: string;

    @Column()
    clientNit: string;

    @Column()
    brand: string;

    @Column()
    type: string;

    @Column()
    plate: string;

    @Column({ nullable: true })
    color?: string;

    @Column({ nullable: true })
    year?: string;

    @Column({ nullable: true })
    nextService?: string;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, { cascade: ['insert', 'update'] })
    orderDetails: OrderDetail[];

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    laborCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    abono?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ default: 'En Proceso' })
    estado: string;
}