import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformUsers implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            if(data.length > 1){
                const User = data.map(user =>{
                const {password, isadmin,  ...cleanUser} =user
                return cleanUser
            })
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
            }else if (data.user) {
                const {password, isadmin, ...userFiltered} = data.user
                const response = {
                    id: data.id,
                    date: data.date,
                    userFiltered,
                    OrderDetails: data.orderDetails
                }
                return {response, statusCode: context.switchToHttp().getResponse().statusCode}
            }
            else{
                const user = data.userbyid || data.newUser
                const {password, passwordConfirm, isadmin,  ...User} = user
                return {User, statusCode: context.switchToHttp().getResponse().statusCode}
            }
        }))
    }
}