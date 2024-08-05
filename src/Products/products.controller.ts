import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,

} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { AuthGuard } from '../guards/Auth.guard';
import { RolesGuard } from '../guards/Role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../roles.enum';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { ProductDto } from './dto/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ): Promise<Product[]> {
    return await this.productsService.getAllProducts(
      Number(limit),
      Number(page),
    );
  }

  @ApiBody({type: Product})
  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() product:ProductDto): Promise<Product> {
    return await this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @ApiBody({type: Product})
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async UpdateProduct(@Param('id', ParseUUIDPipe) id: string,@Body() ProductDto) {
    const ProductUpdated = await this.productsService.updateProduct(
      id,
      ProductDto,
    );
    return ProductUpdated;
  }

  @ApiBearerAuth()
  @ApiBody({type: 'string'})
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async UpdateStockProduct(@Param('id', ParseUUIDPipe) id: string, @Body() newStockToAdd:string ) {
    const ProductUpdated = await this.productsService.addStock(
      id,
      Number(newStockToAdd)
    );
    return ProductUpdated;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    const productDeleted = await this.productsService.deleteProduct(id);
    return productDeleted;
  }

  @Get(':id')
  async GetProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product | string> {
    const productFinder = await this.productsService.getProductById(id);
    return productFinder;
  }
}
