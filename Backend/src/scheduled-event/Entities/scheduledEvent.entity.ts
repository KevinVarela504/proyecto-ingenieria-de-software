/* eslint-disable prettier/prettier */
import { Status } from "src/status/Entities/status.entity";
import { Users } from "src/users/Entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {  Event} from "../../events/entities/event.entity";
import { Inscriptions } from "src/inscriptions/Entities/Inscriptions.entity";

@Entity('ScheduledEvent')
export class ScheduledEvent {

    @PrimaryGeneratedColumn()
    scheduledEventId: number;

    @Column({type:'varchar',length:100,nullable:false})
    name: string;

    @Column({type:'varchar',length:500,nullable:false})
    description_: string;

    @Column({ type: 'datetime', nullable:false, })
    startDate: Date;

    @Column({ type: 'datetime', nullable:false})
    endDate: Date;

    @Column({ type: 'datetime', nullable:false,})
    startHour: Date;

    @Column({ type: 'datetime', nullable:false})
    endHour: Date;

    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    @Column({type: 'int', nullable:true, default:0})
    places: number;

    @Column({type: 'varchar', nullable:false})
    modality:string

    @Column({type: 'varchar', nullable:false})
    address:string

    @Column({name:'status',default:1})
    statusId:number


/*     @ManyToOne(type => Status,Status => Status.StatusID)
    @JoinColumn({name:'status'})
    StatusID!: Status;
 */
    @Column({name:'managerId'})
    managerId:string

    @ManyToOne(type => Users, Users=> Users.email)
    @JoinColumn({name:'managerId'})
    UsersID!: Users;

    @Column({name:'eventId'})
    eventId:number

    @ManyToOne(type => Event, Event=> Event.eventId)
    @JoinColumn({name:'eventId'})
    EventID!: Event;

    @OneToMany(type=>Inscriptions, Inscriptions=>Inscriptions.inscriptionsScheduledEvent)
    inscriptionsScheduledEvent!:ScheduledEvent[];

/*     @ManyToMany(type => Users, Users=> Users.eventsInscripted, { cascade: true })
    @JoinTable()
    usersInscripted: Users[]; */
}
