import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CREATOR_KEY } from 'src/util/key-decorators';
import { IUseToken, useToken } from 'src/util/use.token';

@Injectable()
export class GeneralAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isCreator = this.reflector.get<boolean>(
      CREATOR_KEY,
      context.getHandler(),
    )
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['authorization'];
    if (!token || Array.isArray(token))
      throw new UnauthorizedException('Token Invalido');

    const manageToken: IUseToken | string = await useToken(token);
    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.is_expired)
      throw new UnauthorizedException('El Token ha expirado');

    req.email = manageToken.email;
    req.name = manageToken.name;

    if (isCreator && manageToken.is_student)
      throw new UnauthorizedException('No tienes permiso para acceder')

    return true;
  }
}
