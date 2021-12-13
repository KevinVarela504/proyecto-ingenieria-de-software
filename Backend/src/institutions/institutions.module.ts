import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institutions } from './Entities/Institutions.entity';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';

@Module({

    imports:[
        TypeOrmModule.forFeature([Institutions])  ]
        ,
        controllers:[
            InstitutionsController],
        providers:[
            InstitutionsService
        ],
        exports:[
            TypeOrmModule,InstitutionsService,]

  


})
export class InstitutionsModule {}
