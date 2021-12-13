import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Institutions } from './Entities/Institutions.entity';

@Injectable()
export class InstitutionsService {
    constructor(
        @InjectRepository(Institutions)
        private readonly institutionsRepository: Repository<Institutions>){}
    
    
    async findAllInstitutions(): Promise<Institutions[]>{
        return await this.institutionsRepository.find();
    }
    async createInstitution(body){
        const institution=await this.institutionsRepository.findOne(body);
        if(institution) throw new NotFoundException('Esta institución ya está registrada')
        const newInstitution = this.institutionsRepository.create(body)
        return await this.institutionsRepository.save(newInstitution);
    }
    async getOneInstitution(ID){
        const institution = await this.institutionsRepository.findOne(ID)
        if(!institution) throw new NotFoundException('No se econtraron coincidencias')
        return institution
    }
    async deleteInstitution(id){
        const institution=await this.institutionsRepository.findOne(id);
        if(!institution) throw new NotFoundException('No se econtraron coincidencias')
        return this.institutionsRepository.delete(id)

    }
    async updateInstitution(id,body){
        const institution = await this.institutionsRepository.findOne(id);
        if(!institution) throw new NotFoundException('No se encontraron coincidencias');
        const editInstitution =Object.assign(institution,body);
        return await this.institutionsRepository.save(editInstitution);
        
    }

}
