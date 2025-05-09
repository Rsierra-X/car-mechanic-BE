import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuariosModule} from './usuarios/usuarios.module';
import {ClientesModule} from './clientes/clientes.module';
import {AuthModule} from './auth/auth.module';
import {OrdenesModule} from "./ordenes/ordenes.module";
import {VehiculosModule} from "./vehiculos/vehiculos.module";
import {InventarioModule} from "./inventario/inventario.module";
import {DetalleOrdenModule} from "./detalle-orden/detalle-orden.module";
import { VehiculosListaModule } from './vehiculos-lista/vehiculos-lista.module';
import { ServicioService } from './servicio/servicio.service';
import { ServicioController } from './servicio/servicio.controller';
import { ServicioModule } from './servicio/servicio.module';
import { DetalleOrderController } from './detalle-order/detalle-order.controller';

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
      autoLoadEntities: true,
      logging: ['error', 'warn'],
    }),
    UsuariosModule,
    ClientesModule,
    OrdenesModule,
    AuthModule,
    VehiculosModule,
    InventarioModule,
    DetalleOrdenModule,
    VehiculosListaModule,
    ServicioModule
  ],
  controllers: [AppController],
  providers: [AppService, ServicioService],
})
export class AppModule {}
