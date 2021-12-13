import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InstitutionsDto } from './DTO/Institutions.dto';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {

    constructor(private institutionsService: InstitutionsService){}
    
    @Get('getInstitution/:InstitutionId')
    async getOneInstitution(@Param('InstitutionId') InstitutionId:string){
        return await this.institutionsService.getOneInstitution(InstitutionId);
        
    }

    @Post('createInstitution')
    async createInstitution(@Body() body:InstitutionsDto){
        return await this.institutionsService.createInstitution(body)
        
    }

    @Get('getAll')
    async getAllInstitutions(){
      return await this.institutionsService.findAllInstitutions()  
    }

    @Delete('deleteInstitution/:InstitutionId')
    async deleteInstitution(@Param('InstitutionId') InstitutionId:string){
        return await this.institutionsService.deleteInstitution(InstitutionId);
    }

    @Put('updateInstitution/:InstitutionId')
    async updateInstitution(@Param('InstitutionId') InstitutionId:string,@Body() body:InstitutionsDto){
      return await this.institutionsService.updateInstitution(InstitutionId,body)  ;
    }
}