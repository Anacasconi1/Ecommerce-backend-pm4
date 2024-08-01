import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/Auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
