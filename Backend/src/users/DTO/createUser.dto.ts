import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsNumber, IsString, isString} from "class-validator";

export class createUserDto{

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    middleName  : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    secondLastName : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    academicTraining  : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description_ : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    interests : string;

    @IsNotEmpty()
    @ApiProperty()
    password_: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    institutionRepresenting: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    profilePhoto: string;

}
