import {Request, Response} from "express";
import EcSuppliers from "../../models/ec_suppliers.ts";
import { findSupplierByRegistrationId } from "./finderController.ts"
 
const supplierProfile = async (req: Request,res: Response) =>{
    try{
        const {registration_id} = req.body;
        if(!registration_id){
            return res.status(422).json({error:"registration_id not found"})
        }
        
        const found = await findSupplierByRegistrationId(registration_id);

        if (found == null) {
            return res.json({ message: "Invalid registration id" });
        } else {
            return res.json(found.dataValues);
        }
 
    }catch(error){
        return res.json({message: "error"});
    }
}
 
 
export default supplierProfile;