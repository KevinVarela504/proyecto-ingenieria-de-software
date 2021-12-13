import { Users } from "src/users/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('User-images')
export class UserImage {

    @PrimaryGeneratedColumn()
    imageId: number;
    
    @Column({type:'varchar',nullable:false})
    URL: string;

    @Column({name:'User'})
    userId:string;

    @ManyToOne(type =>Users,Users => Users.email)
    @JoinColumn({name:'User'})
    userID!: Users;

}
