import { Request, Response } from "express";
import {client} from '../../services/mongodb';

const ecommerce = client.db('E-Commerce');

const viewProducts = async (req : Request, res : Response) => {
    try
    {
        const { offset , limit} = req.query;

        const products = await ecommerce.collection('e_commerce').find().skip(parseInt(offset as string)).limit(parseInt(limit as string)).toArray();

        res.status(200).json({ products });
    }
    catch(error) {
        return res.status(404).json({error : error})
    }
}

const sortedProducts = async (req : Request, res : Response) => {
    try {
        const { offset , limit,  sortBy, sortOrder} = req.query;

        const products = await ecommerce.collection('e_commerce').find().skip(parseInt(offset as string)).limit(parseInt(limit as string)).sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 }).toArray();

        res.status(200).json({ products });
    } catch (error) {
        return res.status(404).json({error : error})
    }
}

const searchProducts = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        if (!search)
            return res.status(400).json({ error: "search parameter is required for searching" });

        const products = await ecommerce.collection('e_commerce')
            .find({ $or: [{ product_name: { $regex: new RegExp(search as string, 'i')}}]}).toArray();

        res.status(200).json({ products });

    } catch (error) {
        return res.status(404).json({error : error})
    }
}

export {viewProducts, sortedProducts, searchProducts};