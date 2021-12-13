import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt";
import { Users } from "src/users/Entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JWTPayload } from "./jwt.payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private usersService: UsersService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
      }


      async validate(payload: JWTPayload): Promise<Users> {
        const user = await this.usersService.findUserAuth(payload.email);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}