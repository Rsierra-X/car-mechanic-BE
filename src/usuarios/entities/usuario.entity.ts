import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    UsuarioID: number;

    @Column({ length: 50, unique: true })
    NombreUsuario: string;

    @Column()
    Contrasena: string;

    @Column({ length: 50, nullable: true })
    Rol: string;
}