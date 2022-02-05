import {Schema, model} from 'mongoose'


const TodoModel = new Schema({
    id: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    title: {type: String, required: true},
    dateStart: {type: String, required: true},
    dateFinish: {type: String, required: true},
    description: {type: String},
    important: {type: String},
    status: {type: String, required: true}
})

export = model('TodoModel', TodoModel)