import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class inscriptionsDto{
    
    @IsNotEmpty()
    @IsNumber()
    idScheduledEvent : number;

    @IsNotEmpty()
    @IsString()
    idUser : string;

    @IsNotEmpty()
    @IsString()
    nameUser : string;

    @IsOptional()
    @IsBoolean()
    attendance:boolean
}
