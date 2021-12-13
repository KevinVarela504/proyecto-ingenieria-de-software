import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';
import { UserImage } from './entities/user-image.entity';

@Injectable()
export class UserImagesService {
  constructor(
    @InjectRepository(UserImage)
    private readonly userImagesRepository: Repository<UserImage>){}
  
  async createImage(body){
    const image=await this.userImagesRepository.findOne(body);
    if(image) throw new NotFoundException('Direccion de la imagen ya existente')
    const newImage = this.userImagesRepository.create(body)
    return await this.userImagesRepository.save(newImage);
  }

  async findAllImages(): Promise<UserImage[]>{
    return await this.userImagesRepository.find();
  }

  async findOneImage(id: number) {
    const image = await this.userImagesRepository.findOne(id)
    if(!image) throw new NotFoundException('No se encontro la imagen')
    return image
  }

  async updateImage(id: number, body) {
    const image = await this.userImagesRepository.findOne(id);
    if(!image) throw new NotFoundException('No se encontro la imagen');
    const editedImage = Object.assign(image, body);
    return await this.userImagesRepository.save(editedImage);
  }

  async removeImage(id: number) {
    const image=await this.userImagesRepository.findOne(id);
    if(!image) throw new NotFoundException('No se encontro la imagen')
    return this.userImagesRepository.delete(id)
  }

}
