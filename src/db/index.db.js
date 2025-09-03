import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const databseInstance = mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database connection successful , host name : ${DB_NAME}`);
        
    } catch (error) {
        console.log("Connection to the database failed" ,error);
        process.exit(1)
        
    }
}


export default   connectDB  