import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserImagesService } from './user-images.service';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';

@Controller('user-images')
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) {}

  @Post('createImage')
  async createImage(@Body() createUserImageDto: CreateUserImageDto) {
    return await this.userImagesService.createImage(createUserImageDto);
  }

  @Get('getImage/:imageId')
  async findOneImage(@Param('imageId') imageId) {
    return await this.userImagesService.findOneImage(imageId);
  }

  @Get('getAllImages')
  async findAllImages() {
    return await this.userImagesService.findAllImages();
  }

  @Patch('updateImage/:imageId')
  async updateImage(@Param('imageId') imageId, @Body() updateUserImageDto: UpdateUserImageDto) {
    return await this.userImagesService.updateImage(imageId, updateUserImageDto);
  }

  @Delete('deleteImage/:imageId')
  async removeImage(@Param('imageId') imageId) {
    return await this.userImagesService.removeImage(imageId);
  }
  
}