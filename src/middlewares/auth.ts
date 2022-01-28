import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export default (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorization = request.headers["authorization"];

        if (!authorization) throw new Error("authentication not present");

        const [, token] = authorization.split(" ");
        const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as any;
        request.user = payload.id;
        request.userType = payload.userType;

        next();
    } catch(error: any) {
        return response.status(401).send(error.message)
    }

}