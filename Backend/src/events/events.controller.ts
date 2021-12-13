import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Event } from './entities/event.entity';
import { AuthGuard } from '@nestjs/passport';
import { isEmail } from 'class-validator';

@Crud({
  model: {
    type: Event
  },
  params: {
    id: {
        field: 'id',
        type: 'number',
        primary: true,
        disabled: true, // <= DESHABILITAR EL ID
    }
  }
})


@Controller('events')
export class EventsController implements CrudController<Event> {
  //constructor(private readonly eventsService: EventsService) {}
  constructor(public service: EventsService) {}

  /* @UseGuards(AuthGuard('jwt'))
      @Request() req: any
      const {email,firstName}=req.user;*/


/*   @UseGuards(AuthGuard('jwt'))
  @Post('/createEvent')
  create(@Body() createEventDto: CreateEventDto,@Request() req: any) {
    console.log(req);
    const {email,firstName}=req.user;
    return this.service.create(createEventDto,email);
  } */

 /*  @UseGuards(AuthGuard('jwt')) */
  @Post('/createEvent/:email')
  create(@Body() createEventDto: CreateEventDto,@Param('email') email:string) {
    console.log("llegamos a crear el evento");
    return this.service.create(createEventDto,email);
  }

  @Get('/getAllEvents')
  findAll() {
    return this.service.findAll();
  }

  @Get('/getAllEventsDash/:email')
  findAllDash(@Param('email') email:string) {
    return this.service.findAllDash(email);
  }


  @Get('/getAllEventsWhere/:email')
  findAllWhere(@Param('email') email:string) {
    return this.service.findAllWhere(email);
  }

/* 
  @Get('/getFilterEvents')
  findFilter(@Param('type') type: string, @Param('keyword') keyword: string) {
    return this.service.findFilter(type, keyword);
  }
 */
  @Get('/getOneEventById/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOneId(+id);
  }


  @Patch('/updateEvent/:id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.service.update(+id, updateEventDto);
  }

  @Delete('/deleteEvent/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
