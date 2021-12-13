import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StatusDto } from './DTO/status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {

    constructor(private statusService: StatusService){}
    
    @Get('getStatus/:StatusId')
    getOneStatus(@Param('StatusId') StatusId:string){
        return this.statusService.getOneStatus(StatusId);
        
    }

    @Post('createStatus')
    async createStatus(@Body() body:StatusDto){
        return  await this.statusService.createStatus(body)
        
    }

    @Get('getAll')
    async getAllStatus(){
      return await this.statusService.findAllStatus()  
    }

    @Delete('deleteStatus/:StatusId')
    async deleteStatus(@Param('StatusId') StatusId:string){
        return await this.statusService.deleteStatus(StatusId);
    }

    @Put('updateStatus/:StatusId')
    async updateStatus(@Param('StatusId') StatusId:string,@Body() body:StatusDto){
      return  await this.statusService.updateStatus(StatusId,body)  ;
    }
}
