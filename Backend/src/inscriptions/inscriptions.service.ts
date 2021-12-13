import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/events.service';
import { MailService } from 'src/mail/mail.service';
import { ScheduledEventService } from 'src/scheduled-event/scheduled-event.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Inscriptions } from './Entities/Inscriptions.entity';

@Injectable()
export class InscriptionsService {
    constructor(
        @InjectRepository(Inscriptions)
        private inscriptionRepository: Repository<Inscriptions>,
        private scheduledEventService: ScheduledEventService,
        private usersService: UsersService,
        private eventService:EventsService,
        private mailService:MailService){}
    
    
    async findAllInscriptions(): Promise<Inscriptions[]>{
        return await this.inscriptionRepository.find();
    }
    async findInscriptionWhere(idSE:number,idU:string){
        const inscription = await this.inscriptionRepository.findOne({where:{idScheduledEvent:idSE,idUser:idU}})
        console.log(inscription)
        if(inscription==undefined){
            return false
        }else{
            return true
        }
    }

    async createInscription(body){
        const scheduledEvent=this.scheduledEventService.getOneScheduledEvent(body.idScheduledEvent)
        let currentDate = new Date()
        if(currentDate>(await scheduledEvent).endDate){
            return{
                "message":"Lo sentimos, este evento ya ha finalizado"
            }
        }
        if(await this.findInscriptionWhere(body.idScheduledEvent,body.idUser)==true){
            return{
                "message":"Usted ya está inscrito en este evento"
            }
        }
        
        if((await scheduledEvent).places==0){
            return {
                "message":"Lo sentimos, ya no hay cupos para este evento :C"
            }
        }
        let existInWhiteList=false;
        if(!scheduledEvent) throw new NotFoundException('No existe este ScheduledEvent') 
        const user=this.usersService.findOne(body.idUser)
        if(!user) throw new NotFoundException('No existe este user') 
        const event=this.eventService.findOneEvent((await scheduledEvent).eventId);
        if(!(await event).listWhite){
            body.nameUser = (await user).firstName + " " + (await user).lastName;
            const newInscription = this.inscriptionRepository.create(body)
            await this.inscriptionRepository.save(newInscription);
            await this.mailService.sendUserInscription(body.idUser,(await user).firstName,(await scheduledEvent).name,(await scheduledEvent).startDate.toString(),(await scheduledEvent).endDate.toString(),(await scheduledEvent).startHour.toString(),(await scheduledEvent).endHour.toString(),(await scheduledEvent).modality);
            this.scheduledEventService.updateScheduledEventPlaces((await scheduledEvent).scheduledEventId)
            return  {
                 "message":`Inscripcíon correcta`  
            }
        }else{
            const formato =JSON.parse((await event).listWhite);
            formato.forEach(element => {
                if(element.email==body.idUser){
                    existInWhiteList=true;
                }

              });
              if(existInWhiteList){
                body.nameUser = (await user).firstName + " " + (await user).lastName;
                const newInscription = this.inscriptionRepository.create(body)
                await this.inscriptionRepository.save(newInscription);
                await this.mailService.sendUserInscription(body.idUser,(await user).firstName,(await scheduledEvent).name,(await scheduledEvent).startDate.toString(),(await scheduledEvent).endDate.toString(),(await scheduledEvent).startHour.toString(),(await scheduledEvent).endHour.toString(),(await scheduledEvent).modality);
                await this.scheduledEventService.updateScheduledEventPlaces((await scheduledEvent).scheduledEventId)
                return  {
                     "message":`Inscripcíon correcta`   
                }
              }else{
                return  {
                    "message":`Usuario no tiene permisos para inscribirse en este evento`   
               }
              }
        } 
    }

    async getOneInscription(ID){
        const inscription = await this.inscriptionRepository.findOne(ID)
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return inscription
    }

    async findByShedEvent(idScheduledEventF:number){
        const inscription = await this.inscriptionRepository.find({idScheduledEvent:idScheduledEventF})
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción')
        return inscription
    }
    async deleteInscription(idScheduledEventF:number , idUserF:string){
/*         const inscription=await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción') */
        if((await this.findInscriptionWhere(idScheduledEventF,idUserF)==false)){
            return{
                "message":"Para cancelar la inscripción debe estar inscrito en el evento :)"
            }
        }
        const SE=this.scheduledEventService.getOneScheduledEvent(String(idScheduledEventF))
        let today =new Date()
        if(today>(await SE).endDate){
            return{
                "message":"El evento ya ha finalizado, No se puede cancelar la inscripción :)"
            }
        }
        
        await this.inscriptionRepository.delete({idScheduledEvent:idScheduledEventF,idUser:idUserF})
        return {
            "message":"Inscripción cancelada"
        }

    }
    async updateInscription(id,body){
        const inscription = await this.inscriptionRepository.findOne(id);
        if(!inscription) throw new NotFoundException('No se econtraron coincidencias de esta Inscripción');
        const editInscription =Object.assign(inscription,body);
        return await this.inscriptionRepository.save(editInscription);
        
    }

async getDataCertificate(idScheduledEvent:number){
    return this.inscriptionRepository.find({ where: { idScheduledEvent:idScheduledEvent,attendance:true} });
}
}
