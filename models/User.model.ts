import {Schema, model} from 'mongoose'


const UserModel = new Schema({
    id: {type: String, required: true, unique: true},
    username: {type: String, unique: true, required: true},
    firstName: {type: String},
    secondName: {type: String},
    city: {type: String},
    password: {type: String, required: true},
    role: {type: String, required: true},

})

export = model('UserModel', UserModel)
