import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    FechaRegistro: Date;
}
