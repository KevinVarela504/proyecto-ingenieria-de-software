/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledEventDTO } from './DTO/scheduledEvent.dto';
import { ScheduledEvent } from './Entities/scheduledEvent.entity';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ScheduledEventService {
  constructor(
    @InjectRepository(ScheduledEvent)
    private scheduledEventRepository: Repository<ScheduledEvent>,
    private usersService: UsersService,
    private mailService: MailService,
    private eventService: EventsService,
  ) {}

  async updateScheduledEvent(
    scheduledEventId: string,
    body: ScheduledEventDTO,
  ) {
    const scheduledEvent = await this.scheduledEventRepository.findOne(
      scheduledEventId,
    );
    if (!scheduledEvent)
      throw new NotFoundException(
        'No se encontraron coincidencias para el evento programado',
      );
    const editedScheduledEvent = Object.assign(scheduledEvent, body);
    return await this.scheduledEventRepository.save(editedScheduledEvent);
  }

  /*     async inscribe(email:string, scheduledEventId:number){
        const userSol= await this.usersService.findOne(email);
        const scheduledEventSol=await this.scheduledEventRepository.findOne(scheduledEventId);
        scheduledEventSol.usersInscripted=[userSol]
        return await this.scheduledEventRepository.save(scheduledEventSol)


      } */
  async deleteScheduledEvent(scheduledEventId: string) {
    const scheduledEvent = await this.scheduledEventRepository.findOne(
      scheduledEventId,
    );
    if (!scheduledEvent)
      throw new NotFoundException(
        'No se econtraron coincidencias para el evento programado',
      );
    return this.scheduledEventRepository.delete(scheduledEventId);
  }
  async findAllScheduledEvents(): Promise<ScheduledEvent[]> {
    return await this.scheduledEventRepository.find();
  }

  async findAllScheduledEventsWhere(
    idEvent: number,
  ): Promise<ScheduledEvent[]> {
    return await this.scheduledEventRepository.find({
      where: { eventId: idEvent },
    });
  }
  async createScheduledEvent(body: ScheduledEventDTO) {
    //Validar que exista el MANAGER
    const manager = await this.usersService.findOne(body.managerId);
    if (!manager)
      throw new NotFoundException(
        'No existe ningún usuario con ese correo, no se puede asignar el MANAGER',
      );
    //EN caso de que ya exista un evento programado con ese mismo nombre en la BD para ese evento
    /*        const scheduledEvent=await this.scheduledEventRepository.findOne(body.name);
        if(scheduledEvent) throw new NotFoundException('Ya existe un taller o conferencia con ese nombre') */

    //Evento al que pertenece
    const eventoGlobal = this.eventService.findOneEvent(body.eventId);
    const newStartDate = new Date(body.startDate);
    const newEndDate = new Date(body.endDate);
    if (
      newStartDate > (await eventoGlobal).endDate ||
      newEndDate > (await eventoGlobal).endDate
    ) {
      return {
        message:
          'TALLER O CONFERENCIA NO CREADO, El evento ya ha finalizado o esta ingresando fechas fuere del limite del evento',
      };
    }

    
      /*await this.mailService.sendCharge(
        body.managerId,
        manager.firstName,
        body.name,
        body.startDate.toString(),
        body.endDate.toString(),
        body.startHour.toString(),
        body.endHour.toString(),
        body.modality,
      );*/
 
     

    const newScheduledEvent = this.scheduledEventRepository.create(body);
    /*         console.log("no llego por errores"); */
    //    async sendCharge(emailCharge:string, nameOrganizer:string, nameCharge:string, nameEvent:string, emailOrganizer:string,startDate:string,endDate:string,startHour:string,endHour:string,modality:string)
    /*         console.log("Body",body)
        console.log("Evento Programado",newScheduledEvent) */
    await this.scheduledEventRepository.save(newScheduledEvent);
    console.log("LLega aqui",ScheduledEvent)
    return {
      message: 'Evento programado en agenda :)',
    };
  }
  async getOneScheduledEvent(scheduledEventId: string) {
    const scheduledEvent = await this.scheduledEventRepository.findOne(
      scheduledEventId,
    );
    if (!scheduledEvent)
      throw new NotFoundException(
        'No se econtraron coincidencias para el evento programado',
      );
    return scheduledEvent;
  }

  async updateScheduledEventPlaces(scheduledEventId: number) {
    const scheduledEvent = await this.scheduledEventRepository.findOne(
      scheduledEventId,
    );
    if (!scheduledEvent)
      throw new NotFoundException(
        'No se encontraron coincidencias para el evento programado',
      );
    scheduledEvent.places = scheduledEvent.places - 1;
    return await this.scheduledEventRepository.save(scheduledEvent);
  }
}
