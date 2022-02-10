import express, {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import auth from './routes/auth.router'
import todo from './routes/todo.router'
import social from './routes/social.router'

const PORT = process.env.PORT || 5000
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload());

app.use('/auth', auth);
app.use('/todo', todo);
app.use('/social', social);

(async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@cluster0.auh0l.mongodb.net/todoAdvance?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error: unknown) {
        console.log(error)
    }
})();
