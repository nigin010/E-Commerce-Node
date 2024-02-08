import ec_suppliers from "../../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const login = async (req : Request, res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>> => {
    try 
    {
		const {e_mail, password, user_type} = req.body;

		if(!e_mail)
            return res.status(422).json({message : "Email Field is Empty"});
        if(!password)
            return res.status(422).json({message : "Password Field is Empty"});
		if(!user_type)
			return res.status(422).json({message : "User Type Field is Empty"});

            if (req.body.user_type === "supplier")
            {
                try
                {
                    const {e_mail, password, user_type} = req.body;
                    const found = await ec_suppliers.findOne({where:{e_mail : e_mail}, raw : true});
                    if(found && bcrypt.compareSync(password, found.password))
                    {
                        const token = jwt.sign(
                            {
                              registration_id: found.registration_id,
                              user_type: req.body.user_type,
                            },
                            "my-secret-key",
                            {
                              expiresIn: "24h",
                            }
                          );
                          return res.status(200).json({message : `Supplier successfully logged in. \n Supplier ID : ${found.registration_id}, Token ID : ${token}`});
                    }
                    else
			            return res.status(404).json({message : "Incorrect Username or Password"});
                }
                catch(error : any){
                    console.log(error);
                    return res.status(500).json({message : error});   
                }
	        }
            else
            {
                return res.status(500).json({message : "Not a Supplier"});
            }
    }
    catch(error : any){
        console.log(error);
        return res.status(500).json({message : error});
    }
}

export default login;