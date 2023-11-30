import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/login-dto';
import { IUseToken, useToken } from 'src/util/use.token';

interface AuthResponse {
  token: string;
  roles: string[];
}

@Controller('auth')
export class AuthController {
  @Post('/login')
  async login(@Body() data: LoginDto) {
    const manageToken: IUseToken | string = await useToken(data.token);

    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    return {
      token: data.token,
      roles: [manageToken.is_student ? 'student' : 'admin'],
    };
  }

  @Post('/logout')
  async logout(@Body() token: string) {}
}
