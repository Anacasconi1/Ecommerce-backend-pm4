import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/MorganManual';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import typeormConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './Categories/categories.service';
import { Product } from './products/entities/Product.entity';
import { Category } from './Categories/entities/category.entity';
import { User } from './users/entities/user.entity';

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
    TypeOrmModule.forFeature([Product, Category, User])
  ],
  controllers: [AppController],
  providers: [AppService, ProductsService, CategoriesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
