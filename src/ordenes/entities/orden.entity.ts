import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cliente} from "../../clientes/entities/cliente.entity";
import {Vehiculo} from "../../vehiculos/entities/vehiculos.entity";
import {OrderDetail} from "../../detalle-orden/entities/orderDetail";

@Entity('Ordenes')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fecha: Date;

    @ManyToOne(() => Cliente, { eager: true })
    @JoinColumn({ name: 'clienteId' })
    cliente: Cliente;

    @Column()
    clienteId: number;

    @ManyToOne(() => Vehiculo, { eager: true })
    @JoinColumn({ name: 'vehiculoId' })
    vehiculo: Vehiculo;

    @Column()
    vehiculoId: number;

    @OneToMany(() => OrderDetail, detail => detail.order, { cascade: true })
    detalles: OrderDetail[];

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    manoDeObra: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    abono: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ default: 'En Proceso' })
    estado: string;
}