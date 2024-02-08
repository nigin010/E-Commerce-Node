import {Request, Response} from 'express';
import ec_suppliers from "../../models/ec_suppliers.ts";

const resetPassword = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>> => {
    const {e_mail, user_type, new_password} = req.body;

	if(!e_mail)
		return res.status(422).send("Email Field is Empty!");
	if(!user_type)
		return res.status(422).send("Type of User is not Defined!");
	if(!new_password)
		return res.status(422).send("New Password Field is Empty");

	const result = await ec_suppliers.update({ password : new_password },{where : {e_mail : e_mail}});
	
	if(result != null)
		return res.status(200).send("Password has been Successfully changed!");
	else
		return res.status(404).send("Invalid Email!");
}

export default resetPassword;