import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBody({type: Category})
  @Post()
  async create(@Body() category: Category) {
    return await this.categoriesService.addCategory(category);
  }
  
  @Get()
  async findAll() {
    return await this.categoriesService.getCategories();
  }
}
