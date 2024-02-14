import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import loginImport from '../controllers/authentication/login.ts';
import registerImport from '../controllers/authentication/registration.ts';
const router = Router();

const registration = async (req : Request,res : Response) =>{
    registerImport(req, res);
}

const login = async (req : Request,res : Response) => {
	loginImport(req, res);
}

router.post('/registration', async(req: Request, res: Response) => {
	await registration(req, res);
});

router.post('/login', async(req: Request, res: Response) => {
	await login(req, res);
});

export default router;