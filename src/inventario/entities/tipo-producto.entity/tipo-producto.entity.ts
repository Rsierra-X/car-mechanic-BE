import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('TipoProducto')
export class TipoProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nombre: string;
}
