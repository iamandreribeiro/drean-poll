import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function postPoll(req, res) {
  const { title, expireAt } = req.body;

  pollsCollection.insertOne({ title, expireAt });

  res.sendStatus(201);
}

export async function getPolls(req, res) {
  const polls = await pollsCollection.find({}).toArray();

  res.send(polls);
}

export async function getPollResult(req, res, next) {
    const pollId = ObjectId(req.params.id);

    const poll = await pollsCollection.find({_id: pollId}).toArray();

    const choices = await choicesCollection.find({pollId: pollId}).toArray();

    console.log(poll);
    console.log(choices);
}