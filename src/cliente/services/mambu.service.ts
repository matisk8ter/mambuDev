import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidateNested } from "class-validator";
import { application } from "express";
import { catchError, firstValueFrom, lastValueFrom, map } from "rxjs";
import { ClientDTO } from "../dto/client.dto";
import { DisbursmentDto } from "../dto/loan/disbursment.dto";
import { DisbursementDetails, LoanDto } from "../dto/loan/loan.dto";
import { RepaymentDto } from "../dto/loan/repayment.dto";




@Injectable()
export class MambuService {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }
    private mambu = this.configService.get<string>('URL_MAMBU');

    private data = {
        Accept: 'application/vnd.mambu.v2+json',
        apikey: this.configService.get<string>('API_KEY'),
    };


    // --------------------------CLIENTES--------------------------

    // creacion del cliente
    async createClient(clientDTO: ClientDTO) {
        const url = `${this.mambu}/clients`;
        const { data } = await firstValueFrom(
            this.httpService
                .post(url, clientDTO, {
                    headers: this.data,
                })
                .pipe(
                    catchError((error) => {
                        console.log(error.response.data);
                        throw 'An error happened!';
                    }),
                ),
        );
        return data;

    }
    // aprobacion del cliente
    async approveClient(clientId: string) {

        const body = [
            {
                op: 'REPLACE',
                path: 'state',
                value: 'PENDING_APPROVAL'
            },
        ];

        const url = `${this.configService.get<string>('URL_MAMBU')}/clients/${clientId}`
        const data = await lastValueFrom(
            this.httpService.patch(url, body, { headers: this.data })
                .pipe(map(resp => resp.data))

        )
        return data;
    }
    // obtengo los clientes
    async getClients() {

        const url = `${this.configService.get<string>('URL_MAMBU')}/clients?offset=0&limit=20&paginationDetails=OFF&detailsLevel=FULL`
        const { data } = await lastValueFrom(
            this.httpService.get(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;

    }
    // obtengo un cliente
    async getClientById(id: string) {

        const url = `${this.configService.get<string>('URL_MAMBU')}/clients/${id}?detailsLevel=FULL`
        const data = await lastValueFrom(
            this.httpService.get(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;

    }

    // ----------------------PRESTAMOS----------------------

    // creo cuenta de prestamos
    async createLoans(loanDto: LoanDto) {

        const data = await lastValueFrom(
            this.httpService.post(`${this.mambu}/loans/`, loanDto, { headers: this.data })
                .pipe(map(resp => resp.data))
        )
        return data;
    }
    // apruebo la cuenta de prestamos
    async approveLoansAccount(loanAccountId: string) {

        const body = {
            action: 'APPROVE',
            notes: 'Se aprobòel prestamo',
        };

        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}:changeState`
        const data = await lastValueFrom(
            this.httpService.post(url, body, { headers: this.data })
                .pipe(map(resp => resp.data))

        )
        return data;
    }

    async getCredit(AccountId: string) {

        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/?loanAccountId=${AccountId}&detailsLevel=FULL`
        const data = await lastValueFrom(
            this.httpService.get(url, { headers: this.data })
                .pipe(map(resp => resp.data))
        )
        return data;
    }


    //hace el desembolso de la cuenta de prestamos
    async disbursementTransactions(loanAccountId: string, disbursment: DisbursmentDto) {
        const data = await firstValueFrom(
            this.httpService.post(`${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}/disbursement-transactions`, disbursment, { headers: this.data })
                .pipe(map((res) => res.data))
        );
        return data;
    }

    // aplica las transacciones de pago/repago
    async rpaymentTransactions(loanAccountId: string, repayment: RepaymentDto) {
        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}/repayment-transactions`
        const data = await lastValueFrom(
            this.httpService.post(url, repayment, { headers: this.data })
                .pipe(map(resp => resp.data))
        )
        return data;
    }

    // --------------------PRODUCTOS----------------------

    //Allows retrieval of all loan products
    async getProducts() {

        const url = `${this.configService.get<string>('URL_MAMBU')}/loanproducts/1077001?detailsLevel=FULL`
        const data = await lastValueFrom(
            this.httpService.get(url, { headers: this.data })
                .pipe(map(resp => resp.data))
        )
        return data;
    }

}