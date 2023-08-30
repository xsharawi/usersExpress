import { DataSource } from "typeorm";
import { User } from "./entities/User";

const db = new DataSource({
    type: 'mysql' ,
    port: Number(process.env.DB_PORT),
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    entities:[User],
    logging: true,
    synchronize: true,

})

const init = () => db.initialize().then(()=>{console.log("db connected")}).catch((err)=>console.log(`error connecting ${err}`))

export default {db,init}