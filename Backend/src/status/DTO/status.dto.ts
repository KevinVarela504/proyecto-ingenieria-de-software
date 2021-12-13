import { IsNumber, IsNotEmpty, IsString, Min} from "class-validator";

export class StatusDto{

/*  @IsNotEmpty()
    @IsNumber()
    @Min(1)
    StatusID: number; */
    
    @IsNotEmpty()
    @IsString()
    name : string;

}
