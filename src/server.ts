import app from './app';
import { connectDB, config } from './configs';

import { logger } from './utils';

// env setup
const env = process.env.NODE_ENV;

// Connecting to MongoDB and Starting Server
export const startServer = async () => {
  try {
    const conn: any = await connectDB(config.mongoose.url);

    console.log(`MongoDB database connection established successfully to... ${conn?.connection?.host}`);

    app?.listen(config.port, () => {
      console.log(`Server is listening on port: http://localhost:${config.port} ....`);
    });
  } catch (error: any) {
    console.log('MongoDB connection error. Please make sure MongoDB is running: ');

    logger.error({
      message: `MongoDB connection error. Please make sure MongoDB is running: ${error?.message}`,
    });
  }
};

// Establish http server connection
startServer();

export default app;
