import { config } from 'dotenv'
import { executeCrudOperations } from './mongoModel.js'

// Loading data from .env
config()

// CONSTANTS AND VARIABLES
let url = process.env.DATABASE_URL

await executeCrudOperations(url)