import {Request, Response} from "express";
import EcSuppliers  from "../../models/ec_suppliers";
import EcCustomer from "../../models/ec_customer";
import EcSuperAdmin from "../../models/ec_superAdmin";
import EcSupplierCustomerMapping from "../../models/ec_supplierCustomerMapping";

const supplierInvite = async (req: Request,res: Response) =>{
    try{
        const {supplier_id, customer_id} = req.body;
        const findCustomer = await EcCustomer.findOne({where: {customer_id : customer_id}});

        if(findCustomer)
        {
            const findSupplierInvitingCustomers = await EcSupplierCustomerMapping.findAll({where : {supplier_id : supplier_id, invite_Status : 'Accepted'}});
            const supplierInviteCount = findSupplierInvitingCustomers.length;

            const findSupplier = await EcSuppliers.findOne({where : {registration_id : supplier_id}});
            const planName = findSupplier?.purchased_subscription_plan;

            const findPlan = await EcSuperAdmin.findOne({where : {subscription_plan_name : planName}});
            let maximum_number_of_customers = findPlan?.number_of_customers;

            if(maximum_number_of_customers === undefined)
                maximum_number_of_customers = 0;

            if(supplierInviteCount < maximum_number_of_customers)
            {
                const customerInvited = await EcSupplierCustomerMapping.findOne({where : {customer_id : customer_id, supplier_id : supplier_id}})
                if(customerInvited)
                {
                    return res.status(404).json({message : `The Customer ${findCustomer.customer_name} has Already been Invited`}); 
                }
                else
                {
                    const newSubscription = EcSupplierCustomerMapping.create({supplier_id : supplier_id, customer_id : customer_id});
                    
                    return res.status(200).json({message : `The Customer ${findCustomer.customer_name} has been Successfully Invited By ${findSupplier?.full_name}`});
                }
            }
            else
            {
                return res.status(404).json({message : `This Supplier has already exceeded his Limit of Sending Out Invites!`});
            }
        }
        else
        {
            return res.status(404).json({message: "Customer Doesn't Exist!!"});
        }
 
    }catch(error){
        return res.json({message: error});
    }
}
 
export default supplierInvite;