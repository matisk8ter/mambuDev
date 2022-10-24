import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class AddressDTO{
    
    @IsString()
    parentKey: string;
    
    @IsString()
    encodedKey: string;
   
    @ApiProperty()
    @IsString()
    line1: string;

    @ApiProperty()
    @IsString()
    line2: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    region: string;

    @ApiProperty()
    @IsOptional()
    postcode: string;

    @ApiProperty()
    @IsOptional()
    country: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @IsPositive()
    indexInList: number;

 }


