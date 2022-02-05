import {sign, verify} from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({message: 'Authorized request'})

    verify(token, 'secret', (err: any, user: any) => {
        if (err) return res.status(403).json({message: 'Authorized request'})
        // @ts-ignore
        req.user = user

        next()
    })
}

export const generateAccessToken = (id: string) => {
    const payload = {
        id
    }
    return sign(payload, 'secret', {expiresIn: "24h"} )
}