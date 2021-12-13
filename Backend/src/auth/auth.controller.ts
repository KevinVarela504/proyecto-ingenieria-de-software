import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ForgotUser } from './DTO/forgotUser.dto';
import { loginUser } from './DTO/loginUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authServie:AuthService){}
    @Post('/login')
    async login(@Body() loginDTO: loginUser): Promise<{ access_token: string }> {
     // const { email, password } = loginDTO;
      const valid = await this.authServie.validateUser(loginDTO.email,loginDTO.password_);
      if (!valid) {
        throw new UnauthorizedException("contraseña no valida");
      }
      return await this.authServie.generateAccessToken(loginDTO.email);
    }

    @Post('/forgot')
    async forgot(@Body() forgotUser: ForgotUser){
         console.log("llegamos al backend",forgotUser.email);
         this.authServie.sendEmailForgotPassword(forgotUser);
    }
}
