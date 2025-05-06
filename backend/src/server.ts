import express, { Request, Response } from 'express'
import authRoutes from './routes/authRoutes'
import feedbackRoutes from './routes/feedbackRoutes'
import courseRoutes from './routes/courseRoutes'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 

}))
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/user', authRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/courses', courseRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



