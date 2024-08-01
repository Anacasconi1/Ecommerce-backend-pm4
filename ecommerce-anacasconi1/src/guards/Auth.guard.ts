import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const bearer = req.headers.authorization?.split(' ')[0];
    const token = req.headers.authorization?.split(' ')[1];
    if (!bearer){
      throw new UnauthorizedException('El token debe ser tipo Bearer');
    }
    if(!token){
      throw new UnauthorizedException('Ingresa el token');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.exp = new Date (payload.exp * 1000);
      payload.iat = new Date (payload.iat * 1000);
      req.user = payload;
      return true
    } catch (error) {
      throw new UnauthorizedException('Token invalido')
    }
  }
}
