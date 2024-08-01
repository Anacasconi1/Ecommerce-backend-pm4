import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { LoggerMiddleware } from './middlewares/MorganManual';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { ProductsModule } from './Products/products.module';
import { FilesModule } from './files/files.module';
import typeormConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from './Products/products.service';
import { CategoriesService } from './Categories/categories.service';
import { Product } from './Products/entities/product.entity';
import { Category } from './Categories/entities/category.entity';
import { User } from './Users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>
        configService.get('typeorm')
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
    AuthModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    }), 
    TypeOrmModule.forFeature([Category, Product, User])
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesService, ProductsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
