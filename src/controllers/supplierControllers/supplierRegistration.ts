import express, {Router, Request, Response} from 'express';
import EcSuppliers from "../../models/ec_suppliers.ts";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const registration = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>>=> {
    const {registration_id, user_type} = req.body;

	if(!registration_id)
		return res.status(422).json({error : "ID Field is Empty"});
	if(!user_type)
		return res.status(422).json({error : "User Type Field is Empty"});

	const found = await EcSuppliers.findOne({where : {registration_id : registration_id}});

	if(found != null)
	{
		return res.status(200).json({message : `Supplier Profile\nUser Name : ${found.full_name}\nE Mail : ${found.e_mail}\nProfile Picture : ${found.profile_pic}\nRegistration ID: ${found.registration_id}\nRegistration Time : ${found.registration_time_stamp}`});
	}
	else
		return res.status(404).send('Invalid Credentials');
}

export default registration;