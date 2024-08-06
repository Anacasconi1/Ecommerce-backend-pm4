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

  await appService.deleteUserExample()
  await categoriesService.addCategoriesSeeder()
  await productsService.postSeed()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API E-commerce')
    .setDescription(
      'Servidor de E-commerce.',
      'Para realizar peticiones a las rutas protegidas debes ingresar el token que es dado al iniciar sesion, pero a su vez hay ciertas rutas que solo pueden ser ejecutadas por usuarios administradores.',
      'Para realizar un cambio de roles, comuniquese con la desarrolladora.',
      'Mail de contacto: sabriicasconii@gmail.com',
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
