import Users from '../models/User.model'

import {Response, Request} from 'express'
import {UpdateUserRequestProps} from "../types/social.types";
import {RequestWithJWT} from "../types/middleware.types";

class SocialController {

    async getPeople (request: Request, response: Response) {
        try {
            // @ts-ignore
            const userId = request.user
            const user: Array<any> = await Users.find({isPublic: true})

            const elements = user.filter(({ id }) => id !== userId )

            response.status(200).json({ message: 'Success', elements })

        } catch (error) {
            response.status(500).json({ message: "Server error. Try again later", error })
        }
    }

    async makePublicProfile (request: Request, response: Response) {
        try {
            // @ts-ignore
            const userId = request.user
            await Users.findOneAndUpdate({id: userId}, {isPublic: true})
            const element = await Users.findOne({id: userId})
            response.status(200).json({element})

        } catch (error) {
            response.status(500).json({ message: "Server error. Try again later", error })
        }
    }

    async makePrivateProfile (request: Request, response: Response) {
        try {
            // @ts-ignore
            const userId = request.user
            await Users.findOneAndUpdate({id: userId}, {isPublic: false})
            const element = await Users.findOne({id: userId})
            response.status(200).json({element})

        } catch (error) {
            response.status(500).json({ message: "Server error. Try again later", error })
        }
    }

    async updateProfile (request: RequestWithJWT<UpdateUserRequestProps>, response: Response) {
        try {
            const id = request.user
            const userInfo = request.body
            await Users.findOneAndUpdate({id}, {...userInfo})
            const element = await Users.findOne({id})
            response.status(200).json({element})
        } catch (error) {
            response.status(500).json({ message: "Server error. Try again later", error })
        }
    }



}

export default new SocialController()