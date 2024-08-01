import { Order } from "../../Orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity({
  name: "users"
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({length:50})
  name: string;

  @Column({length:50, unique:true})
  email: string;

  @Column({default: false})
  isadmin: boolean

  @Column({type: 'text'})
  password: string;
  
  @Column({type: "bigint"})
  phone: number;
  
  @Column({type: "text"})
  address: string;

  @Column({length:50, nullable: true})
  country?: string | undefined;

  @Column({length:50, nullable: true})
  city?: string | undefined;

  @OneToMany(()=> Order, (order) => order.user)
  orders: Order[]
}
