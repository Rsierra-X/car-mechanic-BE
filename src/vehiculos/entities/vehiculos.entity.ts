import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}