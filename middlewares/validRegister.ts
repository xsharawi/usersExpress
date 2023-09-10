import express,{Request,Response, NextFunction} from 'express'

let validRegister = (req: Request, res: Response, next: NextFunction) => {
    if( !req.body.email || !req.body.password ){
        res.status(404).send('not enough info email and passowrd are required')
        return;
    }
    next()
}


export default validRegister





