import express, {Router, Request, Response} from 'express';
import EcCustomer from '../../models/ec_customer';

const customerRegistration = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>>=> {
    try
    {
        const {customer_id, customer_name, customer_email, phone_number} = req.body;

        if(!customer_id)
            return res.status(422).json({error : "Customer ID Field is Empty!"});
        
            if(!customer_name)
            return res.status(422).json({error : "Customer Name Field is Empty!"});
        
            if(!customer_email)
            return res.status(422).json({error : "Customer Email Field is Empty!"});
    
            if(!phone_number)
            return res.status(422).json({error : "Phone Number Field is Empty!"});
    
            const newCustomer = await EcCustomer.create({
                customer_id: customer_id,
                customer_name: customer_name,
                customer_email: customer_email,
                phone_number: phone_number,
            },{raw: true});
            
            return res.status(200).json({message : `New Customer Has Been Registerd.\Customer Details\nRegistration ID :${newCustomer.customer_id}\nFull Name :${newCustomer.customer_name}\nEmail :${newCustomer.customer_email}, \Phonue Number : ${newCustomer.phone_number}`});
    }
    catch(error)
    {
        return res.status(404).json({error : error});
    }
}

export default customerRegistration;