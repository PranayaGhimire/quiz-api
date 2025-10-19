import mongoose from "mongoose"

export const mongoConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas Connected");
    } catch (error) {
        console.error(error);
    }
}