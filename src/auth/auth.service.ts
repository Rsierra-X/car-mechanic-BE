import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "../usuarios/entities/usuario.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto): Promise<Omit<Usuario, 'Contrasena'>> {
        const existe = await this.usuarioRepository.findOne({
            where: { NombreUsuario: dto.NombreUsuario },
        });

        if (existe) {
            throw new BadRequestException('El nombre de usuario ya está en uso');
        }

        const hash = await bcrypt.hash(dto.Contrasena, 10);

        const nuevo = this.usuarioRepository.create({
            ...dto,
            Contrasena: hash,
        });

        const usuarioGuardado = await this.usuarioRepository.save(nuevo);

        const { Contrasena, ...resto } = usuarioGuardado;
        return resto;
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: dto.NombreUsuario },
        });

        if (!usuario) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const passwordValid = await bcrypt.compare(dto.Contrasena, usuario.Contrasena);
        if (!passwordValid) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = {
            sub: usuario.UsuarioID,
            username: usuario.NombreUsuario,
            rol: usuario.Rol,
        };

        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
}
