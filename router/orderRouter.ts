import express from 'express';

import {body , validationResult} from 'express-validator';
import { IOrder } from '../modals/IOrder';
import { IUser } from '../modals/IUser';
import OrderTable from '../modals/Order';
import UserTable from '../modals/Users';
import verifyToken from '../modals/middlewares/verifyToken';


const orderRouter:express.Router = express.Router();

/*
    @info : To Place an Order
    @url : http://127.0.0.1:5000/api/orders/place
    @method : post
    @fields : items , tax , total
    @access ; private
 */

    orderRouter.post('/place', [
    body('items').not().isEmpty().withMessage('Items should not be empty'),
    body('tax').not().isEmpty().withMessage('Tax should not be empty'),
    body('total').not().isEmpty().withMessage('Total should not be empty'),
],verifyToken, async (request : express.Request , response : express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {
        let {items , tax , total} = request.body;
        let requestUser:any = request.headers['user']; // see verifyToken Logic
        let user:IUser = await UserTable.findById(requestUser.id);
        let order:IOrder = new OrderTable({
            name : user.name,
            email : user.email,
            mobile : user.address.mobile,
            items : items,
            tax : tax,
            total : total
        });
        order = await order.save(); // save to database
        response.status(200).json({msg : 'Order Placed Successfully' , order : order});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [
                {msg : error.message}
            ]});
    }
    });

    /*
    @info : Get All Orders
    @url : http://127.0.0.1:5000/api/orders/
    @method : get
    @fields : no-fields
    @access ; private
 */
orderRouter.get('/', verifyToken, async (request : express.Request , response : express.Response) => {
    try {
        let requestUser:any = request.headers['user']; // see verifyToken Logic
        let user:IUser = await UserTable.findById(requestUser.id);
        let orders:Array<IOrder> = await OrderTable.find({email : user.email});
        response.status(200).json({orders : orders});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [
                {msg : error.message}
            ]});
    }
});

export default orderRouter
