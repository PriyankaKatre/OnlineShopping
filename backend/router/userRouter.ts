import express from "express";
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import UserTable from './../modals/Users';
import { IAddress, IUser } from "../modals/IUser";
import { body, validationResult, } from 'express-validator'
import verifyToken from "../modals/middlewares/verifyToken";


const userRouter: express.Router = express.Router()

/*
    @info : Register a User
    @url : http://127.0.0.1:5000/api/users/register
    @method: post
    @fields: name, email, password
    @access: public
*/

userRouter.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
] ,async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = request.body;

        const user = await UserTable.findOne({ email })

        if (user) {
             return response.status(401).json({errors : [{msg : 'User already Exists'}]});
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        let avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // default address

        let address: IAddress = {
            flat: '',
            street: '',
            landmark: '',
            state: '',
            city: '',
            country: '',
            pin: '',
            mobile: ''
        }

        const newUser = new UserTable({
            name,
            email,
            password: hasedPassword,
            avatar,
            address,
        })
        await newUser.save();
        response.status(200).json({msg: 'User Registration is success'})
    } catch (error: any) {
        console.error(error);
        response.status(500).json({
            errors: [
                {
                    msg: error.message
                }
        ]})
    }
})

/*
    @info : Login a User
    @url : http://127.0.0.1:5000/api/users/login
    @method: post
    @fields: email, password
    @access: public
*/

userRouter.post('/login', [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
], async (request: express.Request, response: express.Response) => {
     const errors = validationResult(request);
     if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
     }
    try {
        const { email, password } = request.body;
        const user:any = await UserTable.findOne({ email: email });

        if (!user) {
            response.status(401).json({ errors: [{ msg: 'User not found' }] })
        }
        const isPasswordMatch: boolean = await bcrypt.compare(password, user.password)

         if (!isPasswordMatch) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Password' }] })
         }

        //create a token
        let payload = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) throw err;
            response.status(200).json({
                msg: 'Login is success',
                token: token
            })
        })

    }
    catch (error: any) {
        console.error(error);
        response.status(500).json({
            errors: [
                {
                    msg: error.message
                }
        ]})
    }
})

/*
    @info : Get User Info
    @url : http://127.0.0.1:5000/api/users/
    @method: get
    @fields: No -fields
    @access: Private
*/

userRouter.get('/', verifyToken, async (request: express.Request, response: express.Response) => {
    try {
        let requestUser:any = request.headers['user'];
        let user: IUser = await UserTable.findById(requestUser.id).select('-password');
        console.log(user)
        response.status(200).json(user)
    }
    catch (error: any) {
        console.error(error);
        response.status(500).json({
            errors: [
                {
                    msg: error.message
                }
        ]})
    }
})

/*
    @info : Update / Create Address
    @url : http://127.0.0.1:5000/api/users/address
    @method: post
     @fields : flat , street , landmark , city , state , country , pin , mobile
    @access: Private
*/

userRouter.post('/address', [
    body('flat').not().isEmpty().withMessage('Flat is Required'),
    body('street').not().isEmpty().withMessage('Street is Required'),
    body('landmark').not().isEmpty().withMessage('Landmark is Required'),
    body('city').not().isEmpty().withMessage('City is Required'),
    body('state').not().isEmpty().withMessage('State is Required'),
    body('country').not().isEmpty().withMessage('Country is Required'),
    body('pin').not().isEmpty().withMessage('Pin is Required'),
    body('mobile').not().isEmpty().withMessage('Mobile is Required'),
], verifyToken, async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
     try {
        let {flat,street , landmark , city , state , country , pin , mobile} = request.body;

        let newAddress : IAddress = {
            flat : flat,
            street : street,
            landmark : landmark,
            city : city,
            state : state,
            country : country,
            pin : pin,
            mobile : mobile
        };
        let requestUser:any = request.headers['user']; // see verifyToken Logic
        let user:IUser = await UserTable.findById(requestUser.id);
        user.address = newAddress;
        await user.save(); // update to database
        response.status(200).json({msg : 'Address is updated'})
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [
                {msg : error.message}
            ]});
    }

})



export default userRouter
