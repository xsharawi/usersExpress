import "reflect-metadata"
import 'dotenv/config'
import express from 'express';
import os from 'os';
import db from './db/dataSource.js'
const app = express();
const PORT = process.env.PORT;
const HOSTNAME = os.hostname();
import userRoute from './routes/userRoute.js'
import { Permission } from "./db/entities/Permission.js";
import { Role } from "./db/entities/Role.js";
import { In } from "typeorm";

console.log('magic')

app.use(express.json())

app.use('/user', userRoute)

app.post('/createRole', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send('role name needed')
        return;
    }
    if (!req.body.permissions) {
        res.status(400).send('role permissions array needed')
        return;
    }
    const role = new Role();
    role.name = req.body.name;
    let ids = req.body.permissions as number[];
    let permissions = await Permission.find({
        where: {
            id: In(ids)
        }
    })
    role.permissions = permissions;
    await role.save()
    res.status(201).send('role created')
})


app.post('/createPermission', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send('permission name needed')
        return;
    }
    const permission = new Permission();
    permission.name = req.body.name;
    await permission.save()
    res.status(201).send('permission created')
})

app.all('*', (req, res) => {
    res.status(404).send('where you going blud?')
})

app.listen(PORT, () => {
    db.init()
    console.log(`server currently running on http://${HOSTNAME}:${PORT} `)
})