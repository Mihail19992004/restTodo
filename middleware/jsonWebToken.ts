import {sign, verify} from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import {RequestWithJWT} from "../types/middleware.types";

export function authenticateToken(req: RequestWithJWT<null>, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.status(401).json({message: 'Authorized request'})

        verify(token, 'secret', (err: any, user: any) => {
            if (err) return res.status(403).json({message: 'Authorized request'})
            req.user = user.id
            next()
        })
    } catch (error) {
        res.status(500).json({message: 'Authorization error. Please try again later'})
    }

}

export const generateAccessToken = (id: string) => {
    const payload = {
        id
    }
    return sign(payload, 'secret', {expiresIn: "24h"} )
}