import { BaseEntity, BeforeInsert, Column, Entity,JoinColumn,JoinTable,ManyToMany,OneToOne,PrimaryGeneratedColumn  } from "typeorm";
import { Profile } from "./Profile.js";
import { Role } from "./Role.js";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column('varchar',{length: 50, nullable: true})
    fullName: string
    
    @Column('text',{unique:true})
    email: string

    @Column()
    password: string

    // role:
    // rename it and make the relationship many to many
    @Column('enum',{enum: [
        'user',
        'admin',
        'editor'
    ],
    default : 'user',
     nullable: true,
    })
    type: string

    @OneToOne(()=>Profile, p => p.id ,{eager: true})
    @JoinColumn()
    profile: Profile

    @ManyToMany(()=>Role, r => r.users, {eager:true})
    @JoinTable()
    roles: Role[]



}