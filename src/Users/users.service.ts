import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { queryParamsLimitPage } from '../helpers/QueryParamsLimitPage';
import { OrdersService } from '@app/Orders/orders.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject()
    private ordersService: OrdersService
  ) {}

  async findAll(limit: number, page: number) {
    try {
      const users = await this.userRepository.find({
        relations: {
          orders: true,
        },
      });
      if (users.length > 0) {
        const response = queryParamsLimitPage(
          Number(limit),
          Number(page),
          users,
        );
        return response;
      }
    } catch (error) {
      throw new NotFoundException(
        'No se encontraron usuarios en la base de datos, revisa que estén cargados',
      );
    }
  }

  async findOneById(id: string): Promise<any> {
    const userbyid = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        orders: true,
      },
    });
    if (userbyid) {
      return { message: 'Usuario creado con exito', userbyid };
    } else {
      return { message: 'usuario no encontrado' };
    }
  }

  async DeleteUser(id: string) {
    const UserFind = await this.userRepository.findOne({
      where: {
        id,
      }, relations: {
        orders: true
      }
    });
    if (UserFind) {
      if(UserFind.orders.length > 0) {
        UserFind.orders.map(async(order) => {
          await this.ordersService.cancelOrder(order.id)
        })
      }
      const userRemovedId = await this.userRepository.remove(UserFind);
      return {
        message: 'Usuario eliminado con exito',
        id: userRemovedId.id,
      };
    } else {
      throw new NotFoundException(
        'No se pudo encontrar al usuario revisa el id proporcionado',
      );
    }
  }
  async UpdateUser(id: string, UserDto: UserDto) {
    const UserFind = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (UserFind) {
      const userUpdatedId = await this.userRepository.update(id, UserDto);
      return {
        message: 'Usuario actualizado con exito',
        userUpdatedId,
      };
    } else {
      throw new NotFoundException(
        'No se pudo encontrar al usuario revisa el id proporcionado',
      );
    }
  }

}
