import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


dotenv.config()
const app = express()
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))




// error handaling on postman
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('api is running...'))