import {Request, Response} from "express";
import ec_superAdmin  from "../../models/ec_superAdmin";
 
 
const subscriptionPlanProfiler = async (req: Request,res: Response) =>{
    try{
        const {subscription_plan_name} = req.body;
        const found = await ec_superAdmin.findOne({where: {subscription_plan_name: subscription_plan_name}});
 
            if(found==null){
                return res.json({message: "Invalid registration id"});
            }else{
                return res.json(found.dataValues);
            }
 
    }catch(error){
        return res.json({message: "error"});
    }
}
 
 
export default subscriptionPlanProfiler;