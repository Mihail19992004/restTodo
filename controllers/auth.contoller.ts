import {validationResult} from "express-validator";
import User from '../models/User.model'
import {Request, Response} from 'express'
import {hashSync, compareSync} from 'bcrypt'
import {sign} from 'jsonwebtoken'

const generateAccessToken = (id: string) => {
    const payload = {
        id
    }
    return sign(payload, 'secret', {expiresIn: "24h"} )
}

class userController {

    async registration (request: Request, response: Response) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = request.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return response.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = hashSync(password, 7);

            const user = new User({username, password: hashPassword, role: 'user', favorites: [], basket: [], id: Date.now() })
            await user.save()
            return response.status(200).json({title: "Success registration", message: `User: ${username} successfully registered`, user})
        } catch (error) {
            response.status(500).json({message: 'server error', error})
        }
    }

    async auth (request: Request, response: Response) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Login error", errors})
            }
            const {username, password} = request.body
            const user = await User.findOne({username})
            if (!user) {
                return response.status(400).json({title: 'Wrong username' ,message: `User ${username} not found`})
            }
            const validPassword = compareSync(password, user.password)
            if (!validPassword) {
                return response.status(400).json({title: `Wrong password`, message: 'Invalid password'})
            }
            const token = generateAccessToken(user.id)
            return response.status(200)
                .json({token, user})
        } catch (e) {
            console.log(e)
            response.status(400).json({title: 'Login error', message: e})
        }
    }


}

export default new userController()