import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformUsers implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            if(data.length > 0){
                const User = data.map(user =>{
                const {password, ...cleanUser} =user
                return cleanUser
            })
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
            }
            else{
                const user = data.userbyid || data.newUser
                const {password, isadmin,  ...User} = user
                return {User, statusCode: context.switchToHttp().getResponse().statusCode}
            }
        }))
    }
}