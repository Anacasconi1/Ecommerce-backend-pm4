import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoriesService } from './Categories/categories.service';
import { ProductsService } from './Products/products.service';
import { AppService } from './app.service';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const categoriesService = app.get(CategoriesService)
  const productsService = app.get(ProductsService)
  const appService = app.get(AppService)

  const deleteUser = await appService.deleteUserExample()
  const categoriesseeder = await categoriesService.addCategoriesSeeder()
  const productsSeeder = await productsService.postSeed()
  await deleteUser
  if (deleteUser) {
    await categoriesseeder
    if(categoriesseeder){
      await productsSeeder
    }
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce-AnaCasconi1')
    .setDescription(
      'Esta api creada con Nest está construida para el Proyecto del Modulo 4 de Henry, especializacion de backend.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(cors())
  await app.listen(3005);
}
bootstrap();
