import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import {OrdenesModule} from "./ordenes/ordenes.module";
import {VehiculosModule} from "./vehiculos/vehiculos.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tallermecanicodb',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: false, // ¡Cuidado! En producción, usa migraciones syncronize = false
      autoLoadEntities: false, // <-- ADD THIS LINE
      logging: ['error', 'warn'],
    }),
    UsuariosModule,
    ClientesModule,
    OrdenesModule,
    AuthModule,
    VehiculosModule,
    /*
    DetalleOrdenModule,
    InventarioModule,
    ReportesModule,
    */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
