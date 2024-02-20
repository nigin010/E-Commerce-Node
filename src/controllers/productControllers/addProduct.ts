import { Request, Response } from "express";
import {client} from '../../services/mongodb';

const ecommerce = client.db('E-Commerce');


//For inserting a single product

// const addProducts = async (req : Request, res : Response) => {
//     try
//     {
//         const {product_name, product_category, product_price, stock, ...otherData} = req.body;

//         if(!product_name)
//         return res.status(404).json({error : "Empty Product field"});

//         if(!product_category)
//         return res.status(404).json({error : "Empty Product Category field"});
    
//         if(!product_price)
//         return res.status(404).json({error : "Empty Product Price field"});

//         if(!stock)
//         return res.status(404).json({error : "Empty Stock field"});


//         ecommerce.collection('e_commerce').insertOne({product_name : product_name, product_category : product_category, product_price : product_price, stock : stock, ...otherData});

//         return res.status(200).json({message : "Product Has Been Added Successfully!"});
//         console.log("")
//     }
//     catch(error) {
//         return res.status(404).json({error : error})
//     }

// }


//For inserting multiple products
const mockProducts = async (req : Request, res : Response) => {
    try
    {
        const product : Array<{product_name : string, product_category : string, product_price : number, product_stock : number, [key : string] : string|number}> = req.body;
        
        for(let products of product)
        {
            if(!products.product_name)
            return res.status(404).json({error : "Empty Product field"});
    
            if(!products.product_category)
            return res.status(404).json({error : "Empty Product Category field"});
        
            if(!products.product_price)
            return res.status(404).json({error : "Empty Product Price field"});
    
            if(!products.product_stock)
            return res.status(404).json({error : "Empty Stock field"});

        }

        ecommerce.collection('e_commerce').insertMany(product);

        return res.status(200).json({message : "Products Have Been Added Successfully!"});
        console.log("")
    }
    catch(error) {
        return res.status(404).json({error : error})
    }

}

export default mockProducts;