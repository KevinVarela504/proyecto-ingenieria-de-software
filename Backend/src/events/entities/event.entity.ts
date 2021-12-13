import { EventImages } from 'src/event-images/entities/event-images.entity';
import { Institutions } from 'src/institutions/Entities/Institutions.entity';
import { Status } from 'src/status/Entities/status.entity';
import { Users } from 'src/users/Entities/user.entity';
import { ScheduledEvent } from "../../scheduled-event/Entities/scheduledEvent.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate, BeforeInsert, JoinTable, ManyToMany } from 'typeorm';


@Entity('Event')
export class Event {
    
    @PrimaryGeneratedColumn()
    eventId: number;
    
    @Column({type:'varchar',length:50,nullable:false})
    name: string;
    
    @Column({type:'varchar',length:500,nullable:false})
    description_: string;

    @Column({ type: 'datetime', nullable:false, default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: 'datetime', nullable:false})
    endDate: Date;
    
    @Column({type: 'bit', default: true , nullable:false})
    openEvent: boolean;

    @Column({type: 'varchar', nullable:false})
    photo:string
    
    @Column({type: 'varchar', length:8000,nullable:true})
    listWhite:string

    @Column({name:'Institution'})
    institutionId:number

    @ManyToOne(type => Institutions,Institutions => Institutions.InstitutionID)
    @JoinColumn({name:'Institution'})
    InstitutionID!: Institutions;
    
    @Column({name:'status', nullable:true, default: false})
    status:boolean
    
    @Column({name:'user'})
    userId:number
    
    @ManyToOne(type => Users, Users=> Users.EventID) 
    @JoinColumn({name:'user'})
    UsersID!: Users;

    @OneToMany( type => EventImages,EventImages=>EventImages.eventID)
    eventImages: EventImages[];

    @OneToMany( type => ScheduledEvent,ScheduledEvent=>ScheduledEvent.EventID)
    scheduledEvents: ScheduledEvent[];


}
