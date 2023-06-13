import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5001
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => res.send('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))