import {Request, Response} from "express";
import EcSuperAdmin  from "../../../src/models/ec_superAdmin";
 
 
const subscriptionPlanProfiler = async (req: Request,res: Response) =>{
    try{
        const found = await EcSuperAdmin.findAll();
 
            if(found==null){
                return res.json({message: "Invalid registration id"});
            }else{

                return res.json(found);
            }
 
    }catch(error){
        return res.status(422).json({message: "error"});
    }
}
 
 
export default subscriptionPlanProfiler;