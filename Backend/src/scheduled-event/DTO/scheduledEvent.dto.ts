import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber,} from "class-validator";

export class ScheduledEventDTO {
    
    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    description_  : string;
    
    @IsNotEmpty()
    @IsDateString()
    startDate : Date;
    
    @IsNotEmpty()
    @IsDateString()
    endDate : Date;

    @IsNotEmpty()
    @IsDateString()
    startHour : Date;
    
    @IsNotEmpty()
    @IsDateString()
    endHour : Date;

    @IsOptional()
    @IsInt()
    places: number;

    @IsOptional()
    @IsString()
    address: string;
    
    @IsNotEmpty()
    @IsString()
    modality: string;

    @IsNotEmpty()
    @IsString()
    managerId:string

    @IsNotEmpty()
    @IsNumber()
    eventId:number
}
