import { Institutions } from "src/institutions/Entities/Institutions.entity";
import { BeforeInsert, Column,ManyToOne, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToMany } from "typeorm";
import { Event } from "src/events/entities/event.entity";
import* as bcrypt from'bcrypt';
import { ScheduledEvent } from "src/scheduled-event/Entities/scheduledEvent.entity";
import { UserImage } from "src/user-images/entities/user-image.entity";
import { Inscriptions } from "src/inscriptions/Entities/Inscriptions.entity";


@Entity('Users')
export class Users{

    constructor(email: string, firstName: string, middleName: string,lastName,secondLastName:string,
      academicTraining: string,description_ :string,interests:string,password_:string,institutionRepresenting:Institutions) {
      this.email=email;
      this.password_=password_;
      this.academicTraining=academicTraining;
      this.description_=description_;
      this.firstName=firstName;
      this.middleName=middleName;
      this.institutionRepresenting=institutionRepresenting;
      this.interests=interests;
      this.lastName=lastName;
      this.secondLastName=secondLastName;
    }

    @PrimaryColumn()
    email: string;
    @Column()
    firstName: string;
    @Column()
    middleName: string;
    @Column()
    lastName : string;
    @Column()
    secondLastName : string;
    @Column()
    academicTraining: string;
    @Column()
    description_: string;
    @Column()
    interests: string;
    @Column()
    password_: string;
    @Column({nullable:true})
    profilePhoto: string;
    
    @Column({name: 'institution'})
    institutionId: number;

    @ManyToOne(type => Institutions,Institutions => Institutions.InstitutionID)
    @JoinColumn({name: 'institution'})
    institutionRepresenting!: Institutions;
    
    @OneToMany(type => Event,Event=>Event.UsersID!)
    EventID!: Event[];

    @OneToMany(type => ScheduledEvent,ScheduledEvent=>ScheduledEvent.UsersID!)
    scheduledEventId!: ScheduledEvent[];

    @OneToOne( type => UserImage,UserImage=>UserImage.userID)
    userImage: UserImage;
/* 
    //Inscription
    @ManyToMany(type => ScheduledEvent, ScheduledEvent=> ScheduledEvent.usersInscripted) 
    eventsInscripted: ScheduledEvent[]; */

    @OneToMany(type =>Inscriptions, Inscriptions=>Inscriptions.inscriptionsUsers)
    inscriptionsUsers!:Users[];
    
    @BeforeInsert()
    async hashPassword() {
      const salt = await bcrypt.genSalt();
      this.password_ = await bcrypt.hash(this.password_, salt);
    }
  
    async validatePassword(password: string): Promise<boolean> { 
     const result= await bcrypt.compare(password,this.password_)
     return result;
    }
}