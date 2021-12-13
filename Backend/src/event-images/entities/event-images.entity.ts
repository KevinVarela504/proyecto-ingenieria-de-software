import { Event } from "src/events/entities/event.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Event-images')
export class EventImages {
    
    @PrimaryGeneratedColumn()
    imageId: number;
    
    @Column({type:'varchar',nullable:false})
    URL: string;

    @Column({name:'Event'})
    eventId:number

    @ManyToOne(type =>Event,Event => Event.eventId)
    @JoinColumn({name:'Event'})
    eventID!: Event;
}
