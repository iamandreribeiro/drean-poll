import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choicesCollection, votesCollection } from "../database/db.js";

export async function postVote(req, res, next) {
  const choiceId = ObjectId(req.params.id);

  const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

  votesCollection.insertOne({createdAt, choiceId});

  res.sendStatus(201);
}

export async function getPollResult(req, res, next) {
    
}