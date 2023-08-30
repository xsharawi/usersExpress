import { BaseEntity, Column, Entity,PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column('varchar',{length: 50, nullable: true})
    fullName: string
    
    @Column('text',{unique:true})
    email: string

    @Column({length:10})
    password: string

    @Column('enum',{enum: [
        'normal',
        'admin',
        'moderator'
    ],
     nullable: true})
    type: string
}