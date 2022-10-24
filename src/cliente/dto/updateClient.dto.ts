import { PartialType } from "@nestjs/mapped-types";
import { ClientDTO } from "./client.dto";

export class UpdateClientDto extends PartialType(ClientDTO){}