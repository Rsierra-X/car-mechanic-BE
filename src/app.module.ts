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
import {ServicioModule} from './servicio/servicio.module';

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
      synchronize: true, // ¡Cuidado! En producción, usa migraciones syncronize = false
      autoLoadEntities: true,
      logging: ['error', 'warn'],
    }),
    UsuariosModule,
    ClientesModule,
    AuthModule,
    VehiculosModule,
    InventarioModule,
    DetalleOrdenModule,
    VehiculosListaModule,
    ServicioModule,
    OrdenesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
