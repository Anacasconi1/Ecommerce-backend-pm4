import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository:  Repository<User>
  ){}
  async deleteUserExample () {
      const Userexample = await this.userRepository.findOne({where: { email: 'mariano@gmail.com'}})
      if(Userexample){
        await this.userRepository.remove(Userexample)
      }
  }
}
