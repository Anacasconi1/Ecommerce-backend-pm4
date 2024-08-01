import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';
import { Repository } from 'typeorm';
import { Category } from '../Categories/entities/category.entity';
import * as seeder from '../helpers/sedder.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getAllProducts(limit: number, page: number): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        relations: { category: true },
      });
      if (products) {
        const response = this.queryParamsLimitPage(limit, page, products);
        return response;
      }
    } catch (error) {
      throw new NotFoundException(
        'No hay productos disponibles o cargados en la base de datos',
      );
    }
  }

  async getProductById(id: string): Promise<Product | string> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
      },
    });
    return product ? product : 'No se encontró el producto';
  }

  async postSeed() {
    try {
      seeder.map(async (prod) => {
        const finder = await this.productRepository.find({
          where: {
            name: prod.name,
          },
          relations: {
            category: true,
          },
        });
        const catFinder = await this.categoriesRepository.findOne({
          where: { name: prod.category },
        });
        if (!catFinder) {
          throw new NotFoundException(
            'Debes cargar la categoria antes de cargar los productos',
          );
        } else {
          if (!finder.length) {
            await this.productRepository.save({
              name: prod.name,
              description: prod.description,
              price: prod.price,
              stock: prod.stock,
              category: {
                id: catFinder.id,
              },
            });
          }
        }
      });
      return 'Productos cargados con exito';
    } catch (error) {
      throw new NotFoundException(
        'No se pudo completar la precarga de productos',
      );
    }
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    try {
      const ProductAlreadyExist = await this.productRepository.findOne({
        where: {
          name: product.name,
        },
      });
      if (!ProductAlreadyExist) {
        return await this.productRepository.save(product);
      }
    } catch (error) {
      throw new BadRequestException(
        'No se pudo completar la peticion porque el producto ya existe o porque los datos proporcionados no cumplen con los requeridos',
      );
    }
  }

  async updateProduct(id: string, productDto) {
    const checkIfProductExist = await this.productRepository.findOne({
      where: { id: id },
    });
    if (checkIfProductExist) {
      const { imgUrl, ...product } = productDto;
      const productUpdated = await this.productRepository.update(id, {
        ...product,
      });
      return {
        message: 'El producto fue actualizado con exito',
        productUpdated,
      };
    }
    return { message: 'No se encontró el producto' };
  }

  async deleteProduct(id: string) {
    const checkIfProductExist = await this.productRepository.findOne({
      where: { id: id },
    });
    if (checkIfProductExist) {
      await this.productRepository.delete(id);
      return { message: 'El producto se eliminó con exito' };
    }
    return { message: 'No se encontró el producto' };
  }

  queryParamsLimitPage(
    limit: number,
    page: number,
    products: Product[],
  ): Product[] {
    if (!limit) {
      limit = 5;
    }
    if (!page) {
      page = 1;
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }
}
