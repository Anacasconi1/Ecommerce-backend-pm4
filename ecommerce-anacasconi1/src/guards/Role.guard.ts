import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,

} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    
    const areRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
    ]);
    
    const userHasRole = () => {
      return areRoles.some((role) => user?.roles?.includes(role));
    };

    const valid = user && user.roles && userHasRole();

    if (!valid) {
      throw new ForbiddenException('Tu rol no tiene permisos de administrador');
    }
    return valid;
  }
}
