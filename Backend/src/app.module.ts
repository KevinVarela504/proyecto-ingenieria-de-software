/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Users} from './users/Entities/user.entity';
import { InstitutionsController } from './institutions/institutions.controller';
import { InstitutionsModule } from './institutions/institutions.module';
import { InstitutionsService } from './institutions/institutions.service';
import { StatusModule } from './status/status.module';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MailModule } from './mail/mail.module';
import { EventImagesController } from './event-images/event-images.controller';
import { EventImagesModule } from './event-images/event-images.module';
import { UserImagesModule } from './user-images/user-images.module';
import { ScheduledEventController } from './scheduled-event/scheduled-event.controller';
import { ScheduledEventService } from './scheduled-event/scheduled-event.service';
import { ScheduledEventModule } from './scheduled-event/scheduled-event.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { InscriptionsController } from './inscriptions/inscriptions.controller';
import { InscriptionsService } from './inscriptions/inscriptions.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'kevin',
    password: 'Ge1potato1',
    database: 'EventServe',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    options: {
      encrypt: true,
      cryptoCredentialsDetails: {// me tiraba error por una version  de tlsv2 que no es compatible con sql server
                                //↑↑↑↑↑ a weno, gracias por la info crack
          minVersion: 'TLSv1'
      }
    },
    extra:{
      trustServerCertificate: true ,
      validateConnection: false,
      IntegratedSecurity: false,
    }
  }),UsersModule,InstitutionsModule,StatusModule, AuthModule, EventsModule, MailModule, EventImagesModule, UserImagesModule, ScheduledEventModule, InscriptionsModule,
],
  controllers: [AppController, UsersController,InstitutionsController,StatusController, EventImagesController, ScheduledEventController,InscriptionsController],
  providers: [AppService, UsersService,InstitutionsService,StatusService, ScheduledEventService,InscriptionsService],
})
export class AppModule {
 // constructor(private connection: Connection) {}
}
