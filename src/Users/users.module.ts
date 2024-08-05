import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from '../guards/Auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from '../Orders/entities/order.entity';
import { Product } from '../Products/entities/product.entity';
import { OrderDetails } from '../Orders/entities/orderDetails.entity';
import { Category } from '../Categories/entities/category.entity';
import { OrdersService } from '../Orders/orders.service';



@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Product, OrderDetails, Category])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, OrdersService],
})
export class UsersModule {}
