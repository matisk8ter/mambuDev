import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class ClientDocument {

    @PrimaryGeneratedColumn('uuid')
    encodedKey: string;

    @Column('text')
    clientKey: string;

    @Column('text')
    documentType: string;

    @Column('text')
    documentId: string;

    @Column('text')
    issuingAuthority: string;

    @Column('text')
    indexInList: string;

    @ManyToOne(() => Client, (cliente) => cliente.idDocuments)
    client: Client;



}