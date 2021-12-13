import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginUser {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password_:string;
}
