import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Cliente} from "../../clientes/entities/cliente.entity";

@Entity('Vehiculos')
export class Vehiculo {
    @PrimaryGeneratedColumn()
    VehiculoID: number;

    @Column({ length: 50, nullable: true })
    Marca: string;

    @Column({ length: 50, nullable: true })
    Modelo: string;

    @Column({ type: 'int', nullable: true })
    Anio: number;

    @Column({ length: 20, nullable: true })
    Placa: string;

    @Column({ type: 'int', nullable: true })
    Kilometraje: number;

    @Column({ length: 30, nullable: true })
    Color: string;

    @ManyToOne(() => Cliente, { nullable: false })
    @JoinColumn({ name: 'ClienteID' })
    cliente: Cliente;

    @Column()
    ClienteID: number
}