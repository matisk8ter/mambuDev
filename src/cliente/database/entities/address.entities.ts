import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Address {

    @PrimaryGeneratedColumn('uuid')
    encodedKey: string;

    @Column('text')
    parentKey: string;

    @Column('text')
    line1: string;

    @Column('text')
    line2: string;

    @Column('text')
    city: string;

    @Column('text')
    region: string;

    @Column('text')
    postcode: string;

    @Column('text')
    country: string;

    @Column('float')
    indexInList: number;

    @ManyToOne(() => Client, (cliente) => cliente.address)
    client: Client;

}