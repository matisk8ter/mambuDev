import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidateNested } from "class-validator";
import { application } from "express";
import { catchError, firstValueFrom, lastValueFrom, map } from "rxjs";
import { ClientDTO } from "../dto/client.dto";




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

        const url = `${this.configService.get<string>('URL_MAMBU')}/clients/${clientId}`

        const { data } = await lastValueFrom(
            this.httpService.put(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
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

    // ----------------------PRESTAMOS----------------------

    // creo cuenta de prestamos
    async createLoans() {

        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/`
        const { data } = await lastValueFrom(
            this.httpService.post(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;
    }
    // apruebo la cuenta de prestamos
    async approveLoansAccount(loanAccountId: string) {

        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}:changeState`
        const { data } = await lastValueFrom(
            this.httpService.post(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;
    }
    //hace el desembolso de la cuenta de prestamos
    async disbursementTransactions(loanAccountId: string) {
        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}/disbursement-transactions`
        const { data } = await lastValueFrom(
            this.httpService.post(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;
    }
    // aplica las transacciones de pago/repago
    async rpaymentTransactions(loanAccountId: string) {
        const url = `${this.configService.get<string>('URL_MAMBU')}/loans/${loanAccountId}/repayment-transactions`
        const { data } = await lastValueFrom(
            this.httpService.post(url, { headers: this.data })
                .pipe(map(resp => resp.data))
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }))
        )
        return data;
    }

    // --------------------PRODUCTOS----------------------

    //Allows retrieval of all loan products
    async getProducts() {

        const url = `${this.configService.get<string>('URL_MAMBU')}/loanproducts/1077001?detailsLevel=FULL`
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




}