import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VehiculoLista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

}