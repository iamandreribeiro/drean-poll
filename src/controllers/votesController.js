import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { votesCollection } from "../database/db.js";

export async function postVote(req, res, next) {
  const choiceId = ObjectId(req.params.id);

  const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

  votesCollection.insertOne({createdAt, choiceId});

  return res.sendStatus(201);
}