import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, Max } from "class-validator";
import { ExternalID } from "../database/entities/external_ID.entities";
import { AddressDTO } from "./addreess.dto";
import { ClientDocumentDTO } from "./document.dto";

export class ClientDTO {

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    encodedKey: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    mobilePhone: string;

    @ApiProperty()
    @IsString()
    @Max(36)
    emailAddress: string;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    addresses: AddressDTO[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    idDocuments: ClientDocumentDTO[];

    @ApiProperty()
    @IsOptional()
    _personalizados: ExternalID;

}


