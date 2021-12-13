import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventImages } from './entities/event-images.entity';
import { EventImagesController } from './event-images.controller';
import { EventImagesService } from './event-images.service';

@Module({

  imports:[
      TypeOrmModule.forFeature([EventImages])  ]
      ,
      controllers:[
          EventImagesController],
      providers:[
          EventImagesService
      ],
      exports:[
          TypeOrmModule,EventImagesService,]




})
export class EventImagesModule {}
