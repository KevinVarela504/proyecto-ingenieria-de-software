import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { inscriptionsDto } from './DTO/Inscriptions.dto';
import { InscriptionsService } from './inscriptions.service';

@Controller('inscriptions')
export class InscriptionsController {

    constructor(private inscriptionService: InscriptionsService){}
    
    @Get('getInscription/:InscriptionId')
    async getOneInscription(@Param('InscriptionId') InscriptionId:number){
        return await this.inscriptionService.getOneInscription(InscriptionId);
        
    }

    @Post('createInscription')
    async createInscription(@Body() body:inscriptionsDto){
        return await this.inscriptionService.createInscription(body)
        
    }
    @Get('/certificados/:idSheduleEvent')
    async getParticipantsInscription(@Param('idSheduleEvent') idSheduleEvent:number){
       return  this.inscriptionService.getDataCertificate(idSheduleEvent);
    }

    @Get('getAll')
    async getAllInscriptions(){
      return await this.inscriptionService.findAllInscriptions()  
    }

    @Get('getAllByShedEvent/:idScheduledEventF')
    async getAllByShedEvent(@Param('idScheduledEventF') idScheduledEventF : number){
      return await this.inscriptionService.findByShedEvent(idScheduledEventF)
    }

    @Delete('deleteInscription/:idScheduledEventF/:idUserF')
    async deleteInscription(@Param('idScheduledEventF') idScheduledEventF:number,@Param('idUserF') idUserF:string){
        return await this.inscriptionService.deleteInscription(idScheduledEventF,idUserF);
    }

    @Put('updateInscription/:InscriptionId')
    async updateInscription(@Param('InscriptionId') InscriptionId:number,@Body() body:inscriptionsDto){
      return await this.inscriptionService.updateInscription(InscriptionId,body)  ;
    }
}