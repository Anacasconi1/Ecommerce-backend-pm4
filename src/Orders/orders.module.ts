import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/Product.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { User } from '../Users/entities/user.entity';
import { Category } from '../Categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, Product, User, Category])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
