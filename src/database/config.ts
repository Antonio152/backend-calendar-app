import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    /* const options = {
        useNewUrlParameter: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      } as ConnectOptions; */
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`===> MongoDB Connected <===`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}