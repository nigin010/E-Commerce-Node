import express, {Express, NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";

export const X_API_KEY : string = "THIS IS AN X-API KEY";

const verifyToken = (req : Request, res : Response, next : NextFunction) : void | Response => {

    const bearerToken = req.headers.authorization;
    let token;
	if(!bearerToken)
    {
        return res.status(401).json({error : 'Token Not Provided!'});
    }

    token = bearerToken?.split("Bearer ")[1];

    //Verify the token

    jwt.verify(token as string, 'my-secret-key', (err, decoded) => {
        if(err) {
            return res.status(401).json({error : 'Failed to authenticate token', err});
        }

        req.body.jwt_decoded = decoded;
        next();
    });
};

export default verifyToken;