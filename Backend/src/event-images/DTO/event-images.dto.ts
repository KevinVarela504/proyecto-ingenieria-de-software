import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class eventImagesDto{
    
    @IsNotEmpty()
    @IsString()
    URL : string;

    @IsNotEmpty()
    @IsNumber()
    eventId : Number;
}
