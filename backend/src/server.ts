    import express, {Request, Response} from 'express'
    import authRoutes from './routes/authRoutes'
    import facultyRoutes from './routes/facultyRoutes'
    import feedbackRoutes from './routes/feedbackRoutes'
    import dotenv from 'dotenv'


    dotenv.config();

    const app = express();
    app.use(express.json())

    const PORT = process.env.PORT || 5000

    app.use('/api/user', authRoutes)
    app.use('/api/faculty', facultyRoutes)
    app.use('/api/feedbacks', feedbackRoutes)

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })

    

    