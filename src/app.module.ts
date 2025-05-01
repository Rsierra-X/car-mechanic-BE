import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import { OrdenController } from './orden/orden.controller';

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
    ClientesModule,
 /*
    VehiculosModule,
    OrdenesModule,
    DetalleOrdenModule,
    InventarioModule,
    ReportesModule,*/
    AuthModule,
  ],
  controllers: [AppController, OrdenController],
  providers: [AppService],
})
export class AppModule {}
