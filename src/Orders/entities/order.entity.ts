import { OrderDetails } from "./orderDetails.entity";
import { User } from "../../Users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @ManyToOne(()=> User, (user)=> user.orders)
    user: User

    @Column({nullable:false})
    date: string

    @OneToOne(()=> OrderDetails, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetails: OrderDetails
}