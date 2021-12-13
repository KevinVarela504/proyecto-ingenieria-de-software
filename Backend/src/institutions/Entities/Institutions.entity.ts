import { Event } from "src/events/entities/event.entity";
import { Users } from "src/users/Entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Institutions')
export class Institutions{
    @PrimaryGeneratedColumn()
    InstitutionID:number;

    @Column({type:'varchar',length:50,nullable:false})
    name:string

    @OneToMany( type => Users,Users=>Users.institutionRepresenting)
    Users: Users[];
    
    @OneToMany( type => Event,Event=>Event.InstitutionID)
    event: Event[];
}