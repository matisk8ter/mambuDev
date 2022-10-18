import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ClienteModule,
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environments/.env.${process.env.ENV.trim()}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // entities: [],
        autoLoadEntities: true,
        synchronize: true,
        logging: process.env.ENV === 'production' ? false : true,
      }),
    }),
  ],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
