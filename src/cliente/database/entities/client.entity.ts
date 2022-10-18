import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Address } from './address.entities';


@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    encodedKey: string;

    @Column('float')
    id: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('float', {
        unique: true
    })
    phone: string;

    @Column('float')
    documentId: number;

    @Column('text')
    email: string;

    @Column('text')
    gender: string;


    @OneToMany(() => Address, (address) => address.client)
    @JoinTable()
    address: Address[]

    @OneToMany(() => ClientDocument, (document) => document.client)
    @JoinTable()
    idDocuments: ClientDocument[]

    @Column('text')
    preferredLanguage: string;

    

}