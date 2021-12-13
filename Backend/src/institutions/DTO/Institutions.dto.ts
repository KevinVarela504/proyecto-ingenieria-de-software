import { IsNotEmpty, IsString} from "class-validator";

export class InstitutionsDto{
    
    @IsNotEmpty()
    @IsString()
    name : string;

}
