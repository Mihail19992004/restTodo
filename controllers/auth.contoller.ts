import {validationResult} from "express-validator";
import User from '../models/User.model'
import {Request, Response} from 'express'
import {hashSync, compareSync} from 'bcrypt'
import {generateAccessToken} from "../middleware/jsonWebToken";
import {RequestWithJWT} from "../types/middleware.types";
import Todo from '../models/Todo.model'

class userController {

    async registration (request: Request, response: Response) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Field validation error", errors})
            }
            const {username, password} = request.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return response.status(400).json({message: "User with the same name already exists"})
            }
            const hashPassword = hashSync(password, 7);

            const user = new User({username, password: hashPassword, role: 'user', favorites: [], basket: [], id: Date.now() })
            await user.save()
            const token = generateAccessToken(user.id)
            return response.status(200).json({ user, token })
        } catch (error) {
            response.status(500).json({message: 'Server error. Please try again later', error})
        }
    }

    async auth (request: Request, response: Response) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Field validation error", errors})
            }
            const {username, password} = request.body
            const user = await User.findOne({username})
            if (!user) {
                return response.status(400).json({message: 'Username does not exist', title: `User ${username} not found`})
            }
            const validPassword = compareSync(password, user.password)
            if (!validPassword) {
                return response.status(400).json({message: `Wrong password`, title: 'Invalid password'})
            }
            const token = generateAccessToken(user.id)
            return response.status(200)
                .json({token, user})
        } catch (e) {
            response.status(400).json({message: 'Server error. Please try again later', errors: e})
        }
    }

    async remove (request: RequestWithJWT<null, {id: string}>, response: Response) {
        try {
            const { id } = request.params
            await User.findOneAndDelete({ id })
            await Todo.deleteMany({userId: id})
            response.status(200).json({message: 'User success delete'})
        } catch (error) {
            response.status(400).json({message: 'Server error. Please try again later', error})
        }
    }

}

export default new userController()