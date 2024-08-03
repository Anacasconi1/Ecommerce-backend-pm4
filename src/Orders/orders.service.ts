import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MoreThan, Repository } from 'typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { User } from '../Users/entities/user.entity';
import { Product } from '../Products/entities/product.entity';
import { In } from 'typeorm';
import { OrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async addOrder(order: OrderDto) {
    try {
      const id = order.idUser;
      const productsId = order.products;
      const prod = productsId.map((prodid) => prodid.id);
      const allProdsById = await this.productsRepository.find({
        where: { id: In(prod), stock: MoreThan(0) },
      });
      allProdsById.map(async (prod) => {
        prod.stock = prod.stock - 1
        await this.productsRepository.save(prod);
      });
      const userid = await this.userRepository.findOne({ where: { id: id } });
      const price = allProdsById.map((product) => product.price);
      const detailPrice = price.reduce(
        (acum, current) => Number(acum) + Number(current),
        0,
      );
      const date = new Date().toLocaleString();
      const detail = {
        price: detailPrice,
        products: allProdsById,
      };
      
      const orderDetails = await this.orderDetailsRepository.save(detail);
      const neworder = this.ordersRepository.create({
        user: userid,
        date,
        orderDetails,
      });
      const response = await this.ordersRepository.save(neworder);
      return {
        order: {
          id: response.id,
          date: response.date,
          orderDetail:{
            id: orderDetails.id,
            price: orderDetails.price
        }
      }
    }
    } catch (error) {
      throw new BadRequestException(
        'El registro de una nueva categoria no pudo ejecutarse, revisa tu peticion',
      );
    }
  }

  async getOrder(id: string) {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id: id },
        relations: {
          user: true,
          orderDetails: true,
        },
      });
      
      if(order){
        return order;

      }
    } catch (error) {
      throw new NotFoundException(
        'No se encontró la orden requerida, puede que no exista o que el id ingresado no sea el correcto',
      );
    }
  }

  async cancelOrder (id: string) {
    try {
      const orderFinder = await this.ordersRepository.findOne({where: {
        id
      }, relations:{
        orderDetails: true
      }});
      if(orderFinder){
        const orderDetail = orderFinder.orderDetails
        const orderDetailsWithProducts = await this.orderDetailsRepository.findOne({where: {
          id: orderDetail.id
        }, relations: {
          products: true
        }})
        orderDetailsWithProducts.products.map(async (product) => {
          product.stock = product.stock + 1
          await this.productsRepository.save(product)
        })
        await this.ordersRepository.delete(id)
        await this.orderDetailsRepository.remove(orderDetail)
        return {message: `La orden ${id} se ha cancelado con exito`}
      }else {
        return {message: 'No se fue posible encontrar la orden, revisa los datos proporcionados'}
      }
    } catch (error) {
      throw new BadRequestException('Algo salió mal en la peticion, no es posible ejecutarla')
    }
  }
}
