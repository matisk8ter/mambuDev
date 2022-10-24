import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './controller/cliente.controller';
import { Addresses } from './database/entities/address.entities';
import { Client } from './database/entities/client.entity';
import { ClientDocument } from './database/entities/document.entity';
import { ExternalID } from './database/entities/external_ID.entities';
import { ClientService } from './services/client/client.service';
import { MambuService } from './services/mambu.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Client, Addresses, ClientDocument, ExternalID])],
  controllers: [
    ClienteController,
  ],
  providers: [ClientService, MambuService]
})
export class ClienteModule {


}
