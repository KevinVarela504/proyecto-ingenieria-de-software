import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledEventService } from 'src/scheduled-event/scheduled-event.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Inscriptions } from './Entities/Inscriptions.entity';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { ScheduledEventModule } from "src/scheduled-event/scheduled-event.module";
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';

@Module({imports:[TypeOrmModule.forFeature([Inscriptions]),UsersModule,ScheduledEventModule,InstitutionsModule,MailModule,EventsModule],
  controllers: [InscriptionsController],
  providers: [InscriptionsService,ScheduledEventService,UsersService,InstitutionsService,MailService,EventsService],
  exports:[InscriptionsService,TypeOrmModule]
})
export class InscriptionsModule {}
