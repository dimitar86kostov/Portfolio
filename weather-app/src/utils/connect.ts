import mongoose from "mongoose";
import config from "config";

async function connect() {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        console.log('Database connected successfully');

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if connection fails
    }

}
export default connect;




