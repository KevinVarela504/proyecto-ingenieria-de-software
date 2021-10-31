import { IsEmail, isEmpty, IsNotEmpty, IsString, isString} from "class-validator";

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    middleName  : string;

    @IsNotEmpty()
    @IsString()
    firstSurname  : string;

    @IsNotEmpty()
    @IsString()
    secondSurname  : string;

    @IsNotEmpty()
    @IsString()
    academicTraining  : string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsString()
    Interests : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    institution_representing :number;

}
