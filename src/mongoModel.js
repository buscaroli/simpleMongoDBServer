import { MongoClient } from "mongodb"

// CONNECTING TO THE DATABASE
export async function connectMongo(url) {
    let mongoClient

    try {
        mongoClient = new MongoClient(url)
        console.log('Connecting to the Database...')
        await mongoClient.connect()
        console.log(`Connection to Database established at ${Date()}`)
        
        return mongoClient

    } catch (error) {
        console.error(`Conection to Database failed!\n${error}`)
        process.exit()
    }
}

export async function executeCrudOperations(url) {
    
    let mongoClient

    try {
        mongoClient = await connectMongo(url)
        const db = mongoClient.db('home')
        const collection = db.collection('notes')
    } finally {
        await mongoClient.close()
    }
}

// CRUD OPERATIONS
