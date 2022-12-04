import { ObjectId } from "mongodb";
import { choicesCollection } from "../database/db.js";

export async function postChoice(req, res, next) {
  const title = req.body.title;
  const pollId = ObjectId(req.body.pollId);

  choicesCollection.insertOne({ title, pollId });

  return res.sendStatus(201);
}

export async function getChoices(req, res, next) {
  const pollId = ObjectId(req.params.id);

  const choices = await choicesCollection.find({pollId: pollId}).toArray();

  return res.status(200).send(choices);
}
