import {Request, Response} from 'express';
import EcSuppliers from "../../models/ec_suppliers.ts";
import EcSuperAdmin from '../../models/ec_superAdmin.ts';

const registration = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>>=> {
    try{
        const {full_name, e_mail, password, profile_pic,user_type, purchased_subscription_plan} = req.body;

        if(!full_name)
            return res.status(422).json({error : "Enter some Value in the Name Field "});
        if(!e_mail)
            return res.status(422).json({error : "Enter some Value in the Email Field "});
        if(!password)
            return res.status(422).json({error : "Enter some Value in the Password Field "});
		if(!profile_pic)
			return res.status(422).json({error : "Enter some Value in the Profile Picture Field "});
        if(!user_type)
			return res.status(422).json({error : "Enter some Value in the User Type Field "});
        if(!purchased_subscription_plan)
            return res.status(422).json({error : "Enter some Value in the Purchased Subscription Plan Field "});

        if(req.body.user_type === 'super admin' || req.body.user_type === 'Super Admin' || req.body.user_type === 'superAdmin')
        {
            {
                const newSuperAdmin = await EcSuppliers.create({
                    full_name: full_name,
                    e_mail: e_mail,
                    password: password,
                    profile_pic: profile_pic,
                    registration_id : 1,
                    purchased_subscription_plan : "SUPER ADMIN",
                },{raw: true});
                
                return res.status(200).json({message : `New Super Admin Has Been Registerd.\nSupplier Details\nRegistration ID :${newSuperAdmin.registration_id}\nFull Name :${newSuperAdmin.full_name}\nEmail :${newSuperAdmin.e_mail}, \nPassword : ${newSuperAdmin.password}`});
            }
        } 
        else if(req.body.user_type === "supplier"|| req.body.user_type === "Supplier")
        {
            const planFind = await EcSuperAdmin.findOne({where: {subscription_plan_name: purchased_subscription_plan}});

            if(planFind)
            {
                const newSupplier = await EcSuppliers.create({
                    full_name: full_name,
                    e_mail: e_mail,
                    password: password,
                    profile_pic: profile_pic,
                    purchased_subscription_plan : purchased_subscription_plan,
                },{raw: true});
                
                return res.status(200).json({message : `New Supplier Has Been Registerd.\nSupplier Details\nRegistration ID :${newSupplier.registration_id}\nFull Name :${newSupplier.full_name}\nEmail :${newSupplier.e_mail}, \nPassword : ${newSupplier.password}\n Purchased Subscription Plan : ${newSupplier.purchased_subscription_plan}`});
            }
            else
            {
                return res.status(500).json({error : "Invalid Plan!"});
            }
        }
        else
        {
            return res.status(500).json({error : "Invalid User Type!"});
        }
 
    }catch(error : any){
        console.log(error);
        return res.status(500).json({message : error});
    }
}

export default registration;