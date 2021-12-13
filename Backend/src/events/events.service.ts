import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { StatusService } from 'src/status/status.service';
import { UsersService } from 'src/users/users.service';
import { Not } from "typeorm";

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
  constructor(@InjectRepository(Event) repo,
    private institutionService: InstitutionsService,
    private userService: UsersService) {
    super(repo);
  }

  async create(createEventDto: CreateEventDto,idUser:string) {
    /*
      Añadir:
        --> No poder crear un evento si la fecha choca con la fecha de otro evento
        --> No poder crear un evento si la fecha/hora de finalizacion es menor que la de inicio
        --> No poder crear un evento si la fecha de inicio es menor que la actual
        --> No poder crear un evento si la fecha de finalizacion es menor que la actual
        --> No poder crear un evento si la fecha de inicio es mayor que la de finalizacion
        --> No poder crear un evento si la hora de inicio es igual a la de finalizacion
        --> No poder crear un evento si es cerrado y no se define cuantas personas asistiran
    */
   console.log(createEventDto.listWhite);
   if(!createEventDto.listWhite){
    console.log("esta vacia la lista blanca");
   }else{
    const formato =JSON.parse(createEventDto.listWhite);
   // console.log("primer elemento de la lista desde el back",formato[0].email);
    formato.forEach(element => {
      console.log(element)
    });
    
   }


    const {name, description_, startDate, endDate,openEvent,institutionId,photo,listWhite} = createEventDto;
    const institutionEvent = await this.institutionService.getOneInstitution(institutionId)
    const UserEvent= await this.userService.findUserAuth(idUser)
    const post= this.repo.create({name, description_, startDate, endDate,openEvent, InstitutionID:institutionEvent, UsersID:UserEvent,photo,listWhite});
    await this.repo.save(post);
    return{
      "result": `El evento con el nombre ${name} se ha creado con exito`
    }
  }

  findAll(): Promise<Event[]> {
    return this.repo.find();
  }


  findAllDash(email: string): Promise<Event[]> {
    return this.repo.find({ where: { userId: Not (email) }} );
  }

  findAllWhere(email: string): Promise<Event[]> {
    return this.repo.find({ where: { userId: (email) } });
  }


 /*  findFilter(type: string, keyword: string): Promise<Event[]> {
    let filter = {
      keyword: keyword
    };


    return this.repo.find(filter);
    // ===== AQUI DEBE BUSCARSE POR LA KEYWORD =====
  }
 */
  findOneId(id: number): Promise<Event> {
    return this.repo.findOne(id);
  }

  findOneEvent(id: number){
    return this.repo.findOne(id);
  }
  async update(id: number, updateEventDto: UpdateEventDto) {
    /*
      Añadir:
        --> No poder actualizar un evento si las fechas chocan con la fecha de otro evento
        --> No poder actualizar un evento si la fecha/hora de finalizacion es menor que la de inicio
        --> No poder actualizar un evento si la fecha de inicio es menor que la actual
        --> No poder actualizar un evento si la fecha de finalzacion es menor que la actual
        --> No poder actualizar un evento si la fecha de inicio es mayor que la de finalizacion
        --> No poder actualizar un evento si la hora de inicio es igual a la de finalizacion
        --> No poder actualizar un evento si es cerrado y no se define cuantas personas asistiran
    */
    const event = await this.repo.findOne(id);
    if(!event)  return {"mesage":`El Evento con el id ${id} que trata de actualizar no existe dentro de la aplicacion`};
    await this.repo.update(id, updateEventDto);
    return{
      "result":`El evento ${event.eventId} ha sido actualizado con exito`
    }
  }

  async remove(id: number) {
    /*
      Añadir:
        --> No poder eliminar un evento con la fecha de inicio mayor a la fecha actual y menor a la fecha final
    */
    const event = await this.repo.findOne(id);
    if(!event) return {"mesage":`El Evento con el id ${id} que trata de eliminar no existe dentro de la aplicacion`}

    await this.repo.delete(id);
    return{
      "result":`El evento ${event.eventId} con el nombre ${event.name} ha sido eliminado con exito`
    }
  }
}
