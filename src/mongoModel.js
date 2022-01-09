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

        // CRUD: Create note
        // await createOne(collection)

        // CRUD: Read notes by property name
        let authors = await findByAuthor(collection, "Mel")
        console.log(authors)

        // CRUD: Update many
        // await updateManyByAuthor(collection, "Matt", { author: "Matthew" })

        // CRUD: Delete many
        // await deleteByAuthor(collection, "Matthew")

    } finally {
        await mongoClient.close()
    }
}

// CRUD OPERATIONS

// CREATE
export async function createOne(collection) {
    const note = {
        author: "Matt",
        title: "Living in Italy",
        text: "I need to find the best place where to relocate to.",
        tags: ["living", "italy", "home"]
    }

    await collection.insertOne(note)
}

// READ
export async function findByAuthor(collection, name) {
    
    return collection.find({ author: name }).toArray()
}

// UPDATE
export async function updateManyByAuthor(collection, author, updatedFields) {
    await collection.updateMany(
        { author },
        { $set: updatedFields }
    );
 }

 // DELETE
 export async function deleteByAuthor(collection, author) {
    await collection.deleteMany({ author });
 }