import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionsService } from 'src/inscriptions/inscriptions.service';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Users} from './Entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports:[TypeOrmModule.forFeature([Users]),InstitutionsModule],
    controllers:[UsersController],
    providers:[UsersService,InstitutionsService,],
    exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
