import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne, Index } from 'typeorm';
import { Addresses } from './address.entities';
import { ClientDocument } from './document.entity';
import { ExternalID } from './external_ID.entities';


@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    encodedKey: string;

    @Column('text')
    id: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text')
    state: string;

    @Column('text')
    mobilePhone: string;

    @Column()
    @Index({unique:true})
    emailAddress: string;

    @Column('text')
    gender: string;

    @Column('text')
    preferredLanguage: string;

    @OneToMany(() => Addresses, (address) => address.client)
    @JoinTable({name: 'client_addresses'})
    addresses: Addresses[];

    @OneToMany(() => ClientDocument, (document) => document.client)
    @JoinTable()
    idDocuments: ClientDocument[];

    @OneToOne(() => ExternalID, (external) => external.external_ID)
    @JoinTable()
    _personalizados: ExternalID;

}