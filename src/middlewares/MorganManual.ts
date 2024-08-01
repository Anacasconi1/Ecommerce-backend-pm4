import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req:Request, res: Response, next: NextFunction){
        const date = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
        const hours = `${new Date().getHours()}:${new Date().getMinutes()}`;
        console.log(`${req.url}, ${req.method}, ${hours}, ${date}`);
        next()
    }
}
