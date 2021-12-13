import { ScheduledEvent } from "../../scheduled-event/Entities/scheduledEvent.entity"
import { Users } from "src/users/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Inscription')
export class Inscriptions{
    @PrimaryGeneratedColumn()
    idInscription:number;

    @Column({name:'idScheduledEvent', type:'integer',nullable:false})
    idScheduledEvent:number

    @Column({ name:'idUser',type:'varchar',nullable:false})
    idUser:string

    @Column({ name:'nameUser',type:'varchar',nullable:false})
    nameUser:string

    @Column({type:'bit',nullable:true})
    attendance:boolean

    @ManyToOne( () => Users,Users=>Users.inscriptionsUsers)
    @JoinColumn({name:'idUser'})
    inscriptionsUsers: Users
    
    @ManyToOne( () => ScheduledEvent,ScheduledEvent=>ScheduledEvent.inscriptionsScheduledEvent)
    @JoinColumn({name:'idScheduledEvent'})
    inscriptionsScheduledEvent: ScheduledEvent
}