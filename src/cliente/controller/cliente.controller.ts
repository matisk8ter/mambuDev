import { Controller, Post, Get, Put, Body, Param, Patch, BadRequestException } from '@nestjs/common';
import { ClientDTO } from '../dto/client.dto';
import { DisbursmentDto } from '../dto/loan/disbursment.dto';
import { DisbursementDetails, LoanDto } from '../dto/loan/loan.dto';
import { RepaymentDto } from '../dto/loan/repayment.dto';
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
    approveClient(@Param('clientId') clientId: string) {
        this.mambuService.approveClient(clientId);

        return {
            message: "State Updated successfully"
        }
    }

    @Get("/mambu/clients")
    async getClients() {
        return this.mambuService.getClients()
    }

    @Get("/mambu/client/:id")
    async getClient(@Param('id') id: string) {
        return this.mambuService.getClientById(id)
    }


    // creacion de cuenta de prestamo
    @Post("/mambu/createLoans")
    createLoans(@Body() loanDto: LoanDto) {
        return this.mambuService.createLoans(loanDto);
    }

    // aprobar cuenta de prestamo
    @Post("/mambu/approveLoansAccount/:loanAccountId")
    approveLoansAccount(@Param('loanAccountId') loanAccountId: string) {
        return this.mambuService.approveLoansAccount(loanAccountId);
    }

    // desembolso de la cuenta de prestamo
    @Post("/mambu/disbursementTransaction/:loanAccountId")
    disbursementTransaction(@Param('loanAccountId') loanAccountId: string, @Body() disburment: DisbursmentDto) {
        return this.mambuService.disbursementTransactions(loanAccountId, disburment);
    }

    // aplicar las transacciones de pago/repago
    @Post("/mambu/rpaymentTransactions/:loanAccountId")
    async rpaymentTransactions(@Param('loanAccountId') loanAccountId: string, @Body() repayment: RepaymentDto) {
        return await this.mambuService.rpaymentTransactions(loanAccountId, repayment);
    }

    //Allows retrieval of all loan products
    @Get("/mambu/products")
    async getProducts() {
        return this.mambuService.getProducts()
    }

    @Get("/mambu/getCredit/:AccountId")
    async getCredit(@Param('AccountId') AccountId: string) {
        return this.mambuService.getCredit(AccountId);
    }



}
