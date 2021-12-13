import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './Entities/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
 
@Module({

  imports:[
      TypeOrmModule.forFeature([Status])  ]
      ,
      controllers:[
          StatusController],
      providers:[
          StatusService
      ],
      exports:[
          TypeOrmModule,StatusService
      ]




})
export class StatusModule {}
