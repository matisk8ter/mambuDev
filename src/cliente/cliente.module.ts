import { Module } from '@nestjs/common';
import { ClienteController } from './controller/cliente.controller';
import { ClientService } from './services/client/client.service';

@Module({
  controllers: [ClienteController],
  providers:[ClientService]
})
export class ClienteModule {}
