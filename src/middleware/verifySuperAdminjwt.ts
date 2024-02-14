import express, {Express, NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";

const verifySuperAdminjwt = (req : Request, res : Response, next : NextFunction) : void | Response => {

    const bearerToken = req.headers.authorization;
    let token;
	if(!bearerToken)
    {
        return res.status(401).json({error : 'Token Not Provided!'});
    }

    token = bearerToken?.split("Bearer ")[1];

    //Verify the token

    jwt.verify(token as string, 'my-secret-key', (err, decoded) => {
        console.log("Hi from SuperAdminJWT");
        if(err) {
            return res.status(401).json({error : 'Failed to authenticate token', err});
        }

        req.body.jwt_decoded = decoded;
        console.log(decoded);
        if(req.body.jwt_decoded.registration_id === '1')
            next();
        else
            return res.status(401).json({error : 'Not a Super Admin'});
    });
};

export default verifySuperAdminjwt;