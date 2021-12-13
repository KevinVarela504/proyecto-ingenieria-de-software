import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './Entities/status.entity';


@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly StatusRepository: Repository<Status>){}

    async findAllStatus(): Promise<Status[]>{
        return await this.StatusRepository.find();
    }
    
    //LAS FUNCIONES CREATE Y DELETE NO DEBERIAN SER REQUERIDAS, DADO QUE LOS ESTADOS SERAN AGREDOS EN LOCAL
    async createStatus(body){
        const status = await this.StatusRepository.findOne(body)
        if(status) throw new NotFoundException('Este status ya esta registrado')
        const newStatus = this.StatusRepository.create(body)
        return await this.StatusRepository.save(newStatus);
    }
    async getOneStatus(ID){
        /*RECIBE EL ID DEL ESTADO DEL EVENTO*/
        const status = await this.StatusRepository.findOne(ID)
        if(!status) throw new NotFoundException('No se econtraron coincidencias')
        return status
    }
    async deleteStatus(id){
        const status=await this.StatusRepository.findOne(id);
        if(!status) throw new NotFoundException('No se econtraron coincidencias')
        return this.StatusRepository.delete(id)

    }
    async updateStatus(id,body){
        const status = await this.StatusRepository.findOne(id);
        if(!status) throw new NotFoundException('No se encontraron coincidencias');
        const editstatus =Object.assign(status,body);
        return await this.StatusRepository.save(editstatus);
        
    }
}