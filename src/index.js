import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port);