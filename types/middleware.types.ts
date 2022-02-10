import {NextFunction, Request, Response} from 'express'

export interface RequestWithJWT<BodyType = undefined, ParamsType = any> extends Request<ParamsType, any, BodyType> {
    user: number
}
export type convertToValidType = (req: Request, res: Response, next?: NextFunction) => any