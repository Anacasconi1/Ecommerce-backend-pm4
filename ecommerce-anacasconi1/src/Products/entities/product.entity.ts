import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../Categories/entities/category.entity";
import { OrderDetails } from "../../Orders/entities/orderDetails.entity";
import {v4 as uuid} from 'uuid'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({length: 50, unique: true})
  name: string;

  @Column({type: "text"})
  description: string;

  @Column({type: "decimal" })
  price: number;

  @Column({type: "integer"})
  stock: number;

  @Column({type: "text", default: "https://exampleImage.com"})
  imgUrl: string;

  @ManyToOne(()=> Category)
  category: Category

  @ManyToMany(()=> OrderDetails, orderDetails => orderDetails.products)
  @JoinTable()
  orderDetails: OrderDetails[]
}
