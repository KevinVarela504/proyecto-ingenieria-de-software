import { Event } from "src/events/entities/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Status')
export class Status{
    @PrimaryGeneratedColumn()
    StatusID:number;

    @Column({type:'varchar',length:50,nullable:false})
    name:string
    
   /* @OneToMany( type => Event,Event=>Event.StatusID)
    Event: Event[];*/
}