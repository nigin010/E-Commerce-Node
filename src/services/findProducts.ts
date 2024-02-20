import { Db ,SortDirection } from "mongodb";
import {client} from "../services/mongodb"
import { Request,Response } from "express";
let db: Db = client.db("E-Commerce")
 
 
 
const findProduct =async(req:Request,res:Response) : Promise<any>=>{
    try{
        const {supplier_id} = req.query
        if(!supplier_id){
            return res.status(422).json({error:"supplier id not found"})
        }
        const page = parseInt(req.query.page as string) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
 
        const sortField = req.query.sortField as string;
       
        const sortOrderNumber = parseInt(req.query.sortOrder as string) || 1;
        const sortOrder: SortDirection = sortOrderNumber === 1 ? 1 : -1;
        const sortOption: [string, SortDirection] = [sortField, sortOrder];
 
        const searchQuery = req.query.search as string || '';
        const searchRegex = new RegExp(searchQuery, 'i');
       
        const productCategory = req.query.productCategory as string || '';
 
        // const query = {
        //     $or: [
        //         { product_name: { $regex: searchRegex } },
               
        //     ]
        // };
        // const query = {
        //     $and: [
        //         { $or: [{ product_name: { $regex: searchRegex } }] },
        //         { product_category: productCategory } // Filter based on product category
        //     ]
        // };
        let query: any = { $or: [{ product_name: { $regex: searchRegex } }] };
        if (req.query.productCategory) {
            query.product_category = req.query.productCategory as string;
        }
 
 
        const findResult = await db.collection('e_commerce').find(query).sort(sortOption).toArray();
        return res.status(200).json({data:findResult});
        // console.log("testing for 422");
 
     }
     catch(err){
        return res.status(422).json("entry failed")
       
   
    }
}
 
 
export {findProduct};