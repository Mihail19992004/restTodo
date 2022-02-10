import Todo from '../models/Todo.model'
import {Response, Request} from 'express'

class TodoController {

    async getTodo (request: Request, response: Response) {
        try {
            // @ts-ignore
            const userId = request.user
            const elements = await Todo.find({userId})
            response.status(200).json({message: "success", elements})
        } catch (error) {
            response.status(500).json({message: "Server error. Try again later", error})
        }
    }

    async addTodo (request: Request, response: Response) {
        try {
            const { id, title, important, dateStart, description, dateFinish, status } = request.body;
            const candidate = await Todo.findOne({id})
            // @ts-ignore
            const userId = request.user
            if (candidate) {
                response.status(400).json({message: 'Server error. Try again later'})
            }

            const todo = new Todo({id, title, important, dateStart, description, dateFinish, userId, status})

            await todo.save()

            const elements = await Todo.find({userId})

            response.status(200).json({message: "Success creation todo", elements})

        } catch (error) {
            response.status(500).json({message: "Server error. Try again later", error})
        }
    }

    async patchTodo (request: Request, response: Response) {
        try {

            const { id, title, important, dateStart, description, dateFinish, status } = request.body;
            // @ts-ignore
            const userId = request.user
            const candidate = await Todo.findOne({id})

            if (!candidate) {
                response.status(400).json({message: 'Server error. Try again later', error: 'id not found'})
            }

            await Todo.findOneAndUpdate({id}, {title, important, dateStart, description, dateFinish, status})

            const elements = await Todo.find({userId})

            response.status(200).json({message: 'success', elements})

        } catch (error) {

            response.status(500).json({message: "Server error. Try again later", error})

        }
    }

    async remove (request: Request, response: Response) {

        try {
            const {id} = request.params
            // @ts-ignore
            const userId = request.user
            await Todo.findOneAndDelete({ id })
            const elements = await Todo.find({userId})

            response.status(200).json({message: 'success', elements})

        } catch (error) {
            response.status(500).json({message: "Server error. Try again later", error})
        }
    }
}

export default new TodoController()