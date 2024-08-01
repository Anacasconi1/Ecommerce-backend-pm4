import { registerAs } from '@nestjs/config'
import {config as dotenvConfig} from 'dotenv'
import { Product } from '../products/entities/Product.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenvConfig({path: '.env'})

const config = {
        type: 'postgres',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME_NEST,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: false,
        dropSchema: false,
        entities: [ 'dist/**/*.entity{.ts,.js}', Product],
        migrations: [ 'dist/migrations/*{.ts,.js}' ]
}



export default registerAs('typeorm', ()=> config);

export const connectionSource = new DataSource(config as DataSourceOptions)