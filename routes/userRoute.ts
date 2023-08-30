import express from 'express'
import { User } from '../db/entities/User'
import validRegister from '../middlewares/validRegister';

const route = express()

route.get('/',async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users)
    }
    catch(err){
        res.status(500).send('something went wrong')
        console.error(err)
    }
})

route.post('/register',validRegister,(req,res)=>{
    try{
        const newUser = new User();
        newUser.email = req.body.email
        newUser.password = req.body.password
        newUser.fullName = req.body.fullName || "unnamed"
        newUser.type = req.body.type || 'normal'
        newUser.save()
        res.status(200).send('user created')

    }catch(err){
        res.status(500).send('something went wrong')
        console.error(err)
    }
    
})


export default route;