import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('Vehiculos')
export class Vehiculo {
    @PrimaryGeneratedColumn()
    VehiculoID: number;

    @ManyToOne(() => Cliente, cliente => cliente.ClienteID)
    @JoinColumn({ name: 'ClienteID' })
    Cliente: Cliente;

    @Column({ length: 50, nullable: true })
    Marca: string;

    @Column({ length: 50, nullable: true })
    Modelo: string;

    @Column({ type: 'int', nullable: true })
    Anio: number;

    @Column({ length: 17, unique: true, nullable: true })
    VIN: string;

    @Column({ length: 20, nullable: true })
    Placa: string;
}