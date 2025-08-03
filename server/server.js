import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'



// App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initalize Middlewares
app.use(express.json())
app.use(cors())

// API Routes
app.get('/',(req,res)=>res.send("API Working zaid iqbal zaid"))
app.use('/api/user',userRouter)

app.listen(PORT,()=>console.log("Server Running on port "+PORT))