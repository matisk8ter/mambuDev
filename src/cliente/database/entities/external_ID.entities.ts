import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class ExternalID {

    @PrimaryGeneratedColumn('uuid')
    external_ID: string;

    @OneToOne(() => Client, (cliente) => cliente._personalizados)
    client: Client;
}


