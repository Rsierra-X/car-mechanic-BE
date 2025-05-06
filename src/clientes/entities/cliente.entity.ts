import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import {Order} from "../../ordenes/entities/orden.entity";

@Entity('Clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    ClienteID: number;

    @Column({ length: 255 })
    Nombre: string;

    @Column({ length: 255, nullable: true })
    Apellido: string;

    @Column({ length: 255, nullable: true })
    Direccion: string;

    @Column({ length: 20, nullable: true })
    Telefono: string;

    @Column({ length: 255, nullable: true })
    CorreoElectronico: string;

    @Column({ length: 20, nullable: true })
    Nit: string;

    @CreateDateColumn()
    FechaRegistro: Date;

    @OneToMany(() => Order, order => order.client)
    orders: Order[];
}
