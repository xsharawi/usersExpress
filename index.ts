import "reflect-metadata"
import 'dotenv/config'
import express from 'express';
import os from 'os';
import db from './db/dataSource'
const app = express();
const PORT = process.env.PORT;
const HOSTNAME = os.hostname();
import userRoute from './routes/userRoute'

app.use(express.json())

app.use('/user',userRoute)

app.all('*',(req,res)=>{
    res.status(404).send('where you going blud?')
})

app.listen(PORT,()=>{
    db.init()
    console.log(`server currently running on http://${HOSTNAME}:${PORT} `)
})