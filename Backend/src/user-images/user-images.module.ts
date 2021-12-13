import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImagesService } from './user-images.service';
import { UserImagesController } from './user-images.controller';
import { UserImage } from './entities/user-image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserImage])],
  controllers: [UserImagesController],
  providers: [UserImagesService],
  exports:[TypeOrmModule,UserImagesService]
})
export class UserImagesModule {}
