import mongoose, { mongo } from "mongoose";

async function connectarDatabase() {
    mongoose.connect("mongodb+srv://admin:B1admin%40@cluster0.tyrdo.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0");

    return mongoose.connection;
}

export default connectarDatabase;