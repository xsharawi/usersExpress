import { BaseEntity, BeforeInsert, Column, Entity,ManyToMany,PrimaryGeneratedColumn  } from "typeorm";
import { Role } from "./Role.js";

@Entity()
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    name:string
    
    @ManyToMany(()=>Role, r => r.permissions)
    roles: Role[]
}