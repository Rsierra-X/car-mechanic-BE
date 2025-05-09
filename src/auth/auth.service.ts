import {BadRequestException, Injectable, OnApplicationBootstrap, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "../usuarios/entities/usuario.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import vehiculosData from "../vehiculos-lista/vehiculos-lista.json";

@Injectable()
export class AuthService implements OnApplicationBootstrap{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService,
    ) {}


    async onApplicationBootstrap() {
        const count = await this.usuarioRepository.count();
        if (count === 0) {
            const dto: RegisterDto = {
                NombreUsuario: 'admin',
                Contrasena: '@dmin',
                Rol: "1",
            };

            await this.register(dto);
            console.log('Usuario Admin creado correctamente.');
        }
    }

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
            Rol: dto.Rol
        });

        const usuarioGuardado = await this.usuarioRepository.save(nuevo);

        const { Contrasena, ...resto } = usuarioGuardado;
        return resto;
    }

    async login(dto: LoginDto): Promise<{ access_token: string}> {
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
