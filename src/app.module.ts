import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cliente} from "./entities/cliente.entity";
import {ClienteController} from "./controllers/cliente.controller";
import {ClienteService} from "./services/cliente.service";
import {Vehiculo} from "./entities/vehiculo.entity";
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { DetalleOrdenModule } from './detalle-orden/detalle-orden.module';
import { InventarioModule } from './inventario/inventario.module';
import { ReportesModule } from './reportes/reportes.module';
import { AuthModule } from './auth/auth.module';
import {Usuario} from "./usuarios/entities/usuario.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tallermecanicodb',
      entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      synchronize: true, // ¡Cuidado! En producción, usa migraciones syncronize = false
      autoLoadEntities: false, // <-- ADD THIS LINE
      logging: ['error', 'warn'],
    }),
    UsuariosModule,
 /*   ClientesModule,
    VehiculosModule,
    OrdenesModule,
    DetalleOrdenModule,
    InventarioModule,
    ReportesModule,*/
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
