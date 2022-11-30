import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
    await client.connect();
    console.log("DB connected");
} catch (error) {
    console.log(error);
}

const db = client.db("dreanPoll");

export const pollsCollection = db.collection("polls");
export const choicesCollection = db.collection("choices");
export const votesCollection = db.collection("votes");
