import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from '../guards/Auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from '../Orders/entities/order.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
})
export class UsersModule {}
