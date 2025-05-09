import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('MarcaProducto')
export class MarcaProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nombre: string;
}
