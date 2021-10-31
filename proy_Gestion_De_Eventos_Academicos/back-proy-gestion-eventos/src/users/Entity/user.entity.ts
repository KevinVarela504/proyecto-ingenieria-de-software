import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @Column()
    firstName: string;
    @Column()
    middleName: string;
    @Column()
    firstSurname: string;
    @Column()
    secondSurname: string;
    @Column()
    academicTraining: string;
    @Column()
    description: string;
    @Column()
    Interests: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    institution_representing: number;
}