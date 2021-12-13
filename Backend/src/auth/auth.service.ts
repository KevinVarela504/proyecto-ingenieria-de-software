import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { ForgotUser } from './DTO/forgotUser.dto';
import { JWTPayload } from './JWT/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService
      ) {}
    
      async validateUser(email: string, pass: string): Promise<boolean> {
        const user = await this.usersService.findUserAuth(email);
        if(!user)throw new NotFoundException("correo no valido no validos");
        
        return await user.validatePassword(pass);
      }
    
      async generateAccessToken(email: string) {
        const user = await this.usersService.findUserAuth(email);
        if(!user)throw new NotFoundException("datos no validos");
        const payload: JWTPayload = { email: user.email,firstName:user.firstName,urlPhoto:user.profilePhoto };
        console.log(payload);
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      async sendEmailForgotPassword(forgotUser:ForgotUser){
        await  this.mailService.sendUserPassword(forgotUser.email);
      }
}
