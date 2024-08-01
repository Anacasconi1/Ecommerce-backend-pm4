import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({length: 50, unique: true})
    name: string
}