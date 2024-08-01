import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/Product.entity";
import { Order } from "./order.entity";
import {v4 as uuid} from 'uuid'


@Entity()
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: "decimal", scale: 2})
    price: number

    @OneToOne(()=> Order, order => order.orderDetails)
    @JoinColumn()
    order: Order

    @ManyToMany(()=>Product, product => product.orderDetails)
    products: Product[]
}