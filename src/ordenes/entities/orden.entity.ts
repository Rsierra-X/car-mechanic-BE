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

/*
{
    "clienteId": 1,
    "vehiculo": {
    "Placa": "P123ABC",
        "Marca": "Toyota",
        "Modelo": "Corolla",
        "Anio": 2020,
        "Color": "Blanco",
        "Kilometraje": 120000
},
    "detalles": [
    {
        "tipo": "producto",
        "productoId": 5,
        "cantidad": 2,
        "precioUnitario": 250
    },
    {
        "tipo": "servicio",
        "servicioId": 3,
        "precioUnitario": 500
    }
],
    "manoDeObra": 100,
    "abono": 200,
    "total": 1100
}*/
