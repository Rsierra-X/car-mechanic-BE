import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {MarcaProducto} from "./marca-producto.entity/marca-producto.entity";
import {TipoProducto} from "./tipo-producto.entity/tipo-producto.entity";

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

    @Column()
    sku: string;

    @ManyToOne(() => MarcaProducto, { eager: true })
    @JoinColumn()
    marca: MarcaProducto;

    @ManyToOne(() => TipoProducto, { eager: true })
    @JoinColumn()
    tipo: TipoProducto;
}