import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { ClientDTO } from '../dto/client.dto';
import { ClientService } from '../services/client/client.service';
import { MambuService } from '../services/mambu.service';

@Controller('clients')
export class ClienteController {

    constructor(
        private readonly clientService: ClientService,
        private readonly mambuService: MambuService,
    ) { }

    @Post("/sql/clientAdd")
    async createClientSQL(@Body() clientDto: ClientDTO) {
        return await this.clientService.save(clientDto.id, clientDto)
    }

    // creacion del cliente
    @Post("/mambu/clientAdd")
    async createClient(@Body() clientDto: ClientDTO) {
        return await this.mambuService.createClient(clientDto);
    }
    // creacion del cliente
    @Post("/mambu/clientAddToSql")
    async createClientMambuToSQL(@Body() clientDto: ClientDTO) {
        const createClientMambu = await this.mambuService.createClient(clientDto);
        console.log(createClientMambu)
        const saveClientSQL = await this.clientService.save(createClientMambu.id, createClientMambu);

        return saveClientSQL
    }

    // creacion de cuenta de prestamo
    @Post("/mambu/createLoans")
    async createLoans(){
        return await this.mambuService.createLoans();
    }

    // aprobar cuenta de prestamo
    @Post("/mambu/approveLoansAccount/:loanAccountId")
    async approveLoansAccount(@Param('loanAccountId') loanAccountId: string){
        return await this.mambuService.approveLoansAccount(loanAccountId);
    }

    // desembolso de la cuenta de prestamo
    @Post("/mambu/disbursementTransaction/:loanAccountId")
    async disbursementTransaction(@Param('loanAccountId') loanAccountId: string){
        return await this.mambuService.disbursementTransactions(loanAccountId);
    }

    // aplicar las transacciones de pago/repago
    @Post("/mambu/rpaymentTransactions/:loanAccountId")
    async rpaymentTransactions(@Param('loanAccountId') loanAccountId: string){
        return await this.mambuService.rpaymentTransactions(loanAccountId);
    }

    //aprobacion del cliente
    @Put("/mambu/approveClient/:clientId")
    async approveClient(@Param('clientId') clientId: string){
        return await this.mambuService.approveClient(clientId);
    }

    //Allows retrieval of all loan products
    @Get("/mambu/products")
    async getProducts(){
        return this.mambuService.getProducts()
    }

    @Get("/mambu/clients")
    async getClients(){
        return this.mambuService.getClients()
    }
    @Get("/mambu/client/:id")
    async getClient(@Param('id') id: string){
        return this.mambuService.getClientById(id)
    }
    

}
