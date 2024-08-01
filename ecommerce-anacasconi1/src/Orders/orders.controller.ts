import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../guards/Auth.guard';
import { OrderDto } from './dto/create-order.dto';
import { TransformUsers } from '../interceptors/separatePassword';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformUsers)
  async getOrder(@Param('id', ParseUUIDPipe) id:string){
    return await this.ordersService.getOrder(id)
  }
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformUsers)
  async addOrder(@Body() order:OrderDto){
    const response = await this.ordersService.addOrder(order)
    return response
  }
}
