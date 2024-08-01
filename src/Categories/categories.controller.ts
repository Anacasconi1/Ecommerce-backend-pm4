import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/seeder')
  async Seeder() {
    return await this.categoriesService.addCategoriesSeeder();
  }

  @Post()
  async create(@Body() category: Category) {
    return await this.categoriesService.addCategory(category);
  }
  
  @Get()
  async findAll() {
    return await this.categoriesService.getCategories();
  }
}
