import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateUserImageDto {
    @IsNotEmpty()
    @IsString()
    URL : string;

    @IsNotEmpty()
    @IsString()
    userId : string;

}
