import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(limit: number, page: number) {
    try {
      const users = await this.userRepository.find({
        relations: {
          orders: true,
        },
      });
      if (users.length > 0) {
        const response = this.queryParamsLimitPage(
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
      },
    });
    if (UserFind) {
      const userRemovedId = await this.userRepository.delete(id);
      return {
        message: 'Usuario eliminado con exito',
        userRemovedId,
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

  queryParamsLimitPage(limit: number, page: number, users: User[]) {
    if (!limit) {
      limit = 5;
    }
    if (!page) {
      page = 1;
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    users = users.slice(start, end);
    return users;
  }
}
