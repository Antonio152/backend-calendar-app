// Imported packages
import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import eventsRoutes from './routes/events'
import { connectDB } from './database/config'
dotenv.config()

// Initialziations
const app: Application = express()
const PORT = process.env.PORT ?? 5000

// Settings
app.set('port', PORT) // Port
app.use(express.json())

// Database connection
connectDB()

// CORS
app.use(cors())

// Public route
app.use(express.static('public'))

// Routes
// ! Auth
app.use('/api/auth', authRoutes)
// ! Events
app.use('/api/events', eventsRoutes)

app.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT} ⚡`);
});