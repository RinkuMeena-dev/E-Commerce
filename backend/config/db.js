import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL) // Changed from MONGODB_URI to MONGODB_URL
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("DB error:", error.message)
    }
}

export default connectDb