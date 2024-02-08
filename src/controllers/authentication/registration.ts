import {Request, Response} from 'express';
import ec_suppliers from "../../models/ec_suppliers.ts";

const registration = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>>=> {
    try{
        const {full_name, e_mail, password, profile_pic,user_type} = req.body;

        if(!full_name)
            return res.status(422).send("Enter some Value in the Name Field ");
        if(!e_mail)
            return res.status(422).send("Email Field is Empty");
        if(!password)
            return res.status(422).send("Password Field is Empty");
		if(!profile_pic)
			return res.status(422).send("Profile Picture Field is Empty");
        if(!user_type)
			return res.status(422).send("User Type Field is Empty");
		
        if(req.body.user_type === "supplier"|| req.body.user_type === "Supplier")
        {
            const newSupplier = await ec_suppliers.create({
                full_name: full_name,
                e_mail: e_mail,
                password: password,
                profile_pic: profile_pic
            },{raw: true});
            
            return res.status(200).send(`New Supplier Has Been Registerd.\nSupplier Details\nRegistration ID :${newSupplier.registration_id}\nFull Name :${newSupplier.full_name}\nEmail :${newSupplier.e_mail}, Password : ${newSupplier.password}`);
        }
        else
        {
            return res.status(500).send("User Type is Not Supplier!");
        }
 
    }catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
}

export default registration;