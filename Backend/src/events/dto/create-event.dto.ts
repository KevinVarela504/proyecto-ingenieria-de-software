import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsString, IsDateString, IsBoolean, IsOptional, IsNumber} from "class-validator";

export class CreateEventDto {
    
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
    @IsBoolean()
    openEvent: boolean;

    @IsOptional()
    @IsString()
    listWhite: string;

    @IsNotEmpty()
    @IsNumber()
    institutionId: number;
        

    @IsOptional()
    @IsString()
    photo: string;
}
