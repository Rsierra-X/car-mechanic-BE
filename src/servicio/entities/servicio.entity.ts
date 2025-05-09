import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Servicios')
export class Servicio {
    @PrimaryGeneratedColumn()
    ServicioID: number;

    @Column({ length: 255 })
    Nombre: string;

    @Column('text', { nullable: true })
    Descripcion: string;

    @Column({ type: 'enum', enum: ['propio', 'tercero'], default: 'propio' })
    Tipo: 'propio' | 'tercero';

    @CreateDateColumn()
    FechaIngreso: Date;
}