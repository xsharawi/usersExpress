import express from 'express'
import { User } from '../db/entities/User.js'
import validRegister from '../middlewares/validRegister.js';
import { Profile } from '../db/entities/Profile.js';
import { Role } from '../db/entities/Role.js';
import { In } from 'typeorm';

const route = express()

route.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    }
    catch (err) {
        res.status(500).send('something went wrong')
        console.error(err)
    }
})

route.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const users = await User.findBy({id});
        res.send(users)
    }
    catch (err) {
        res.status(500).send('something went wrong')
        console.error(err)
    }
})

route.post('/addRole/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        let roleid = Number(req.body.id);
        const user = await User.findOneBy({id});
        const role = await Role.findOneBy({id:roleid});
        if(!user){
            res.status(500).send('no user found')
            return;
        }
        if(!role){
            res.status(500).send('no role found')
            return;
        }
        user.roles.push(role)
        await user.save()
        res.status(201).send('role added')
    }
    catch (err) {
        res.status(500).send('something went wrong')
        console.error(err)
    }
})

route.post('/register', validRegister, async (req, res) => {

    try{
        const profile = new Profile();
        profile.DOB = req.body.dob || new Date(new Date().setFullYear(new Date().getFullYear() - 40));
        profile.firstName = req.body.firstName || "unknown";
        profile.lastName = req.body.lastName || "unknown";
        await profile.save();

        const newUser = new User();
        newUser.fullName = `${req.body.firstName} ${req.body.lastName}` || "unkown";
        newUser.email = req.body.email || 'no email';
        newUser.password = req.body.password || "loserhasnopasswordhaha";
        newUser.type = req.body.type || 'user';
        newUser.profile = profile;
        let ids = req.body.roles as number[];
        let roles = await Role.find({
            where: {
                id: In(ids)
            }
        })
        newUser.roles = roles;
        await newUser.save()
        res.status(200).send('user created')
    }catch(err){
        console.error(err)
        res.status(500).send('something went wrong')
    }

})


export default route;