import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Productos')
export class Producto {
    @PrimaryGeneratedColumn()
    ProductoID: number;

    @Column({ length: 255 })
    Nombre: string;

    @Column({ length: 255, nullable: true })
    Descripcion: string;

    @Column('int')
    Cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 })
    PrecioUnitario: number;

    @CreateDateColumn()
    FechaIngreso: Date;
}