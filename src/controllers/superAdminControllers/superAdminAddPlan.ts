import { Request, Response } from "express";
import EcSuperAdmin from '../../models/ec_superAdmin.ts';
import EcSuppliers from "../../models/ec_suppliers.ts";

const superAdminAddPlan = async (req : Request, res : Response) => {
    try
    {
        const {subscription_plan_id, subscription_plan_name, subscription_fee, number_of_customers} = req.body;

        if(!subscription_plan_id)
        return res.status(404).json({error : "Empty Subscription Plan ID field"});

        if(!subscription_plan_name)
        return res.status(404).json({error : "Empty Subscription Plan Name field"});
    
        if(!subscription_fee)
        return res.status(404).json({error : "Empty Subscription Plan Fee field"});

        if(!number_of_customers)
        return res.status(404).json({error : "Empty Maximum Number Of Customers field"});

        const findSuperAdmin = await EcSuppliers.findOne({where: {registration_id : 1}});
        if(findSuperAdmin)
        {
            const newSuperAdmin = EcSuperAdmin.create({
                subscription_plan_id : subscription_plan_id,
                subscription_plan_name : subscription_plan_name,
                subscription_fee : subscription_fee, 
                number_of_customers : number_of_customers
            }, {raw : true});

            return res.status(200).json({message : `New Subscription Plan Has Been Created. The Details of the New Plan Are As Follows :- \nSubscription Plan ID : ${((await newSuperAdmin).subscription_plan_id)}\nSubscription Plan Name :${(await newSuperAdmin).subscription_plan_name}\n Subscription Fee :  ${((await newSuperAdmin).subscription_fee)} \nMaximum Number Of Customers :  ${((await newSuperAdmin).number_of_customers)} `})
        }
        else
        {
            return res.status(500).json({message : "User Type is Not Super Admin!"});
        }
    }
    catch(error) {
        return res.status(404).json({error : error})
    }

}

export default superAdminAddPlan;