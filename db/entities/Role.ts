import { BaseEntity, BeforeInsert, Column, Entity,JoinTable,ManyToMany,PrimaryGeneratedColumn  } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column('text',{  
    default : 'user',
     nullable: true})
    name: string

    @ManyToMany(() => Permission, p => p.roles,{eager:true})
    @JoinTable()
    permissions: Permission[]

    @ManyToMany(() => User, u => u.roles)
    users: User[]
}
