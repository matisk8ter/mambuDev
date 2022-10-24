import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Addresses } from 'src/cliente/database/entities/address.entities';
import { Client } from 'src/cliente/database/entities/client.entity';
import { ClientDocument } from 'src/cliente/database/entities/document.entity';
import { AddressDTO } from 'src/cliente/dto/addreess.dto';
import { ClientDTO } from 'src/cliente/dto/client.dto';
import { ClientDocumentDTO } from 'src/cliente/dto/document.dto';
import { UpdateClientDto } from 'src/cliente/dto/updateClient.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

    private logger = new Logger('ClientService')

    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Addresses)
        private readonly addressRepository: Repository<Addresses>,
        @InjectRepository(ClientDocument)
        private readonly clientDocumentRepository: Repository<ClientDocument>,
    ) { }


    async save(id: string, clientDto: ClientDTO) {
        let exist: Client;
        exist = await this.clientRepository.findOneBy({ id: id })
        if (exist) {
            throw new BadRequestException(`Client with id: ${id} exists in DB`)
        }
        if (!exist) {

            const documentsDtoList = clientDto.idDocuments.map(document => {
                //Crear document dto
                const documentDTO = new ClientDocumentDTO();
                documentDTO.clientKey = document.clientKey;
                documentDTO.encodedKey = document.encodedKey;
                documentDTO.documentType = document.documentType;
                documentDTO.documentId = document.documentId;
                documentDTO.issuingAuthority = document.issuingAuthority;
                documentDTO.indexInList = document.indexInList;

                //Guardar el documento
                this.clientDocumentRepository.save(documentDTO)
                return documentDTO;
            });

            const addressDtoList = clientDto.addresses.map(address => {
                //Crear address dto
                const addressDTO = new AddressDTO()
                addressDTO.parentKey = address.parentKey;
                addressDTO.encodedKey = address.encodedKey;
                addressDTO.line1 = address.line1;
                addressDTO.line2 = address.line2;
                addressDTO.city = address.city;
                addressDTO.region = address.region;
                addressDTO.postcode = address.postcode;
                addressDTO.country = address.country;
                addressDTO.indexInList = address.indexInList;

                //Guardar la direccion
                this.addressRepository.save(addressDTO)
                return addressDTO
            })
            clientDto.addresses = addressDtoList;
            clientDto.idDocuments = documentsDtoList;

            return this.clientRepository.save(clientDto);
        }
    }

    async findClientBy(encodedKey: string) {
        let client: Client;

        if (isUUID(encodedKey)) {
            client = await this.clientRepository.findOneBy({ encodedKey: encodedKey })
        }
        if (!client) {
            throw new NotFoundException(`Client with id: ${encodedKey} not found`)
        }
        return client
    }


    async update(encodedKey: string, updateClientDto: UpdateClientDto) {

        const client = await this.clientRepository.preload({
            encodedKey: encodedKey,
            ...updateClientDto
        })

        if (!client) throw new NotFoundException(`Client with id: ${encodedKey} not found`)

        try {

            await this.clientRepository.save(client)
            return client

        } catch (error) {
            this.handleDBExceptions(error)
        }
    }

    async delete(encodedKey: string) {
        const client = await this.findClientBy(encodedKey)
        if (client) {
            await this.clientRepository.remove(client)
            return `Successfully deleted `
        }
    }


    private handleDBExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail)

        this.logger.error(error)

        throw new InternalServerErrorException("unexpected error, check server logs")
    }


}
