import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculos.entity';

@Entity('Ordenes')
export class Orden {
    @PrimaryGeneratedColumn()
    OrdenID: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'ClienteID' })
    Cliente: Cliente;

    @ManyToOne(() => Vehiculo)
    @JoinColumn({ name: 'VehiculoID' })
    Vehiculo: Vehiculo;

    @CreateDateColumn()
    FechaCreacion: Date;

    @Column({ type: 'datetime', nullable: true })
    FechaInicio: Date;

    @Column({ type: 'datetime', nullable: true })
    FechaFinalizacion: Date;

    @Column({ length: 50 })
    Estado: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    TotalOrden: number;
}