import { BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column('date')
    DOB: Date




}