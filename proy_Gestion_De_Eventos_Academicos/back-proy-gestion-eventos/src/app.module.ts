import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/Entity/user.entity';

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'kevin',
    password: 'Ge1potato1',
    database: 'AcademicEvents',
    entities: [User],
    synchronize: true,
  }),
],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
