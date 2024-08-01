import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as seeder from '../helpers/sedder.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategoriesSeeder() {
    try {
      seeder.map(async (seed) => {
        const finder = await this.categoriesRepository.findOne({
          where: { name: seed.category }
        });
        if (!finder) {
          await this.categoriesRepository.save({ name: seed.category });
        }
      });
      return { message: 'Se resolvió el seed correctamente' };
    } catch (error) {
      throw new NotFoundException('No es posible cargar el seed de categorias')
    }
  }

  async addCategory(category: Category) {
    try {
      const categoryExist = await this.categoriesRepository.findOne({where: {
        name: category.name
      }})
      if(categoryExist){
        throw new BadRequestException('Esta categoria ya existe')
      }else{
        const newCategory = await this.categoriesRepository.save(category);
        return {
          massage: "Categoria creada con exito",
          newCategory
        }
      }
      
    } catch (error) {
      throw new BadRequestException('El registro de una nueva categoria no pudo ejecutarse, revisa tu peticion')
    }
    
  }

  async getCategories() {
    const AreCategoriesLoaded = await this.categoriesRepository.find()
    try {
      if (AreCategoriesLoaded.length > 0) {
        return await this.categoriesRepository.find();
      }
    } catch (error) {
      throw new NotFoundException('No hay categorias cargadas en la base de datos')
    }
  }
}
