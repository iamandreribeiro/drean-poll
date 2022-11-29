import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
    await client.connect();
    console.log("DB connected");
} catch (error) {
    console.log(error);
}

const port = process.env.PORT || 5000;

app.listen(port);