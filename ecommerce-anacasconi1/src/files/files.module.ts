import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/Product.entity';
import { CloudinaryConnection } from '../config/cloudinary';
import { FilesRepository } from './files.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConnection, FilesRepository],
})
export class FilesModule {}
