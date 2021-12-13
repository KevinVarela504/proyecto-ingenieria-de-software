import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ScheduledEvent } from './Entities/scheduledEvent.entity';
import { ScheduledEventController } from './scheduled-event.controller';
import { ScheduledEventService } from './scheduled-event.service';

@Module({imports:[TypeOrmModule.forFeature([ScheduledEvent]),UsersModule,InstitutionsModule,MailModule,EventsModule],
    controllers: [ScheduledEventController],
    providers: [ScheduledEventService,UsersService,InstitutionsService,MailService,EventsService],
    exports:[ScheduledEventService,TypeOrmModule]})
export class ScheduledEventModule {}
