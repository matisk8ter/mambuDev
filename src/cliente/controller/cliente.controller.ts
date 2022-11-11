import { Controller, Post, Get, Put, Body, Param, Patch, BadRequestException } from '@nestjs/common';
import { ClientDTO } from '../dto/client.dto';
import { ClientService } from '../services/client/client.service';
import { MambuService } from '../services/mambu.service';

@Controller('clients')
export class ClienteController {

    constructor(
        private readonly clientService: ClientService,
        private readonly mambuService: MambuService,
    ) { }


    // creacion del cliente
    @Post("/mambu/clientAddToSql")
    async createClientMambuToSQL(@Body() clientDto: ClientDTO) {
        const createClientMambu = await this.mambuService.createClient(clientDto);
        const saveClientSQL = await this.clientService.save(createClientMambu.id, createClientMambu);

        return saveClientSQL
    }

    //aprobacion del cliente
    @Patch("/mambu/approveClient/:clientId")
    async approveClient(@Param('clientId') clientId: string) {
        const aprobado = this.mambuService.approveClient(clientId);
        if(!aprobado)throw new BadRequestException("Error al parobar el cliente")
        
        return {
            message: "State Updated successfully"
        }
    }

    // creacion de cuenta de prestamo
    @Post("/mambu/createLoans")
    async createLoans() {
        return await this.mambuService.createLoans();
    }

    // aprobar cuenta de prestamo
    @Post("/mambu/approveLoansAccount/:loanAccountId")
    async approveLoansAccount(@Param('loanAccountId') loanAccountId: string) {
        return await this.mambuService.approveLoansAccount(loanAccountId);
    }

    // desembolso de la cuenta de prestamo
    @Post("/mambu/disbursementTransaction/:loanAccountId")
    async disbursementTransaction(@Param('loanAccountId') loanAccountId: string) {
        return await this.mambuService.disbursementTransactions(loanAccountId);
    }

    // aplicar las transacciones de pago/repago
    @Post("/mambu/rpaymentTransactions/:loanAccountId")
    async rpaymentTransactions(@Param('loanAccountId') loanAccountId: string) {
        return await this.mambuService.rpaymentTransactions(loanAccountId);
    }

    //Allows retrieval of all loan products
    @Get("/mambu/products")
    async getProducts() {
        return this.mambuService.getProducts()
    }

    @Get("/mambu/clients")
    async getClients() {
        return this.mambuService.getClients()
    }
    @Get("/mambu/client/:id")
    async getClient(@Param('id') id: string) {
        return this.mambuService.getClientById(id)
    }


}
