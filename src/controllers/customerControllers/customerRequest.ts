import express, {Router, Request, Response} from 'express';
import EcCustomers from '../../models/ec_customer';
import EcSupplierCustomerMapping from '../../models/ec_supplierCustomerMapping';

const customerRequest = async (req : Request,res : Response) :Promise<Response<any, Record<string, {message: string} | {message: string, token: string}>>| undefined>=> {
    try
    {
        const {supplier_id, customer_id, response} = req.body;

        if(!supplier_id)
            return res.status(422).json({error : "Supplier ID Field is Empty!"});

        if(!customer_id)
            return res.status(422).json({error : "Customer ID Field is Empty!"});
        
        if(!response)
            return res.status(422).json({error : "Response Field is Empty!"});
        
        
        const findSupplierCustomerFromMapping = await EcSupplierCustomerMapping.findAll({where : {customer_id : customer_id}});

        if(findSupplierCustomerFromMapping)
        {
            const findCustomerFromMapping = await EcSupplierCustomerMapping.findOne({where : {supplier_id : supplier_id, customer_id : customer_id}})
            if(findCustomerFromMapping)
            {
                if(findCustomerFromMapping.invite_status === 'PENDING')
                {
                    if(response === 'Accept' || response === 'accept')
                    {
                        findCustomerFromMapping.invite_status = 'Accepted';
                        await findCustomerFromMapping.save();

                        const findCustomersToBeRejected = await EcSupplierCustomerMapping.findAll({ where: { customer_id: customer_id, invite_status : 'PENDING'} });
                        
                        findCustomersToBeRejected.forEach(async customer => {
                            customer.invite_status = 'Rejected';
                            await customer.save();
                        });
                        const findCustomer = await EcCustomers.findOne({where : {customer_id : customer_id}});
                        if(findCustomer)
                        {
                            findCustomer.invitee = findCustomerFromMapping.supplier_id;
                            findCustomer.save();
                            return res.status(404).json({message : "Supplier Request Has Been Successfully Accepted!"});
                        }
                        else
                            return res.status(404).json({message : "Customer Not Found!!!"});
                    }
                    else
                    {
                        findCustomerFromMapping.invite_status = 'Rejected';
                        findCustomerFromMapping.save();
                        return res.status(404).json({message : "Supplier Request Has Been Rejected!"});
                    }
                }
                else
                {
                    return res.status(200).json({message : "There are no Pending Requests!"});
                }
                
            }
            else
            {
                return res.status(404).json({message : "Customer Not Found!"});
            }
            
        }
        else
        {
            return res.status(200).json({message : "There is No Pending Customer Invites For This Customer!"});
        }
            
            
    }
    catch(error)
    {
        return res.status(404).json({error : error});
    }
}

export default customerRequest;