import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class ClientDocumentDTO {

    @ApiProperty()
    @IsString()
    clientKey: string;

    @ApiProperty()
    @IsString()
    encodedKey: string;

    @ApiProperty()
    @IsString()
    documentType: string;

    @ApiProperty()
    @IsString()
    documentId: string;

    @ApiProperty()
    @IsString()
    issuingAuthority: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @IsPositive()
    indexInList: number;
}


