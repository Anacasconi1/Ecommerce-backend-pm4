import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../Users/dto/user.dto';
import * as Bcypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly JwtService: JwtService,
  ) {}

  async SignIn(Credentials: LoginUserDto) {
    try {
      const credentialsAuth = await this.userRepository.findOne({
        where: {
          email: Credentials.email,
        },
      });
      const PasswordCompare = Bcypt.compare(
        Credentials.password,
        credentialsAuth.password,
      );
      if (credentialsAuth) {
        if (PasswordCompare) {
          const userPayload = {
            sub: credentialsAuth.id,
            id: credentialsAuth.id,
            email: credentialsAuth.email,
            roles: [credentialsAuth.isadmin ? Role.Admin : Role.User],
          };
          const token = this.JwtService.sign(userPayload);
          return { message: 'Inicio de sesion exitoso', token };
        } else {
          throw new BadRequestException('Credenciales incorrectas');
        }
      } else {
        throw new BadRequestException('Credenciales incorrectas');
      }
    } catch (error) {
      throw new BadRequestException(
        'El inicio de sesion no pudo ejecutarse, revisa tu peticion',
      );
    }
  }

  async createUser(UserDto: UserDto) {
    try {
      const IsAUserWithEmail = await this.userRepository.findOne({
        where: {
          email: UserDto.email,
        },
      });
      if (!IsAUserWithEmail) {
        if (UserDto.password === UserDto.passwordConfirm) {
          const EncryptedPassword = await Bcypt.hash(UserDto.password, 10);
          const newUser = await this.userRepository.save({
            ...UserDto,
            password: EncryptedPassword,
          });
          return { message: `Usuario creado con exito: ${newUser.id}` };
        } else {
          throw new BadRequestException(
            'Las contraseñas provistas no coinciden',
          );
        }
      } else {
        throw new BadRequestException('El email provisto ya está registrado');
      }
    } catch (error) {
      throw new BadRequestException(
        'El registo de usuario no pudo ejecutarse, revisa tu peticion',
      );
    }
  }
}
