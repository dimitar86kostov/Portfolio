import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        logger.info('Database connected successfully');

    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1); // Exit the process if connection fails
    }

}
export default connect;




