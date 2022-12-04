import { pollsCollection } from "../database/db.js";

export async function postPoll(req, res) {
  const title = res.locals.title;
  const expireAt = res.locals.expireAt;

  pollsCollection.insertOne({ title, expireAt });

  return res.sendStatus(201);
}

export async function getPolls(req, res) {
  const polls = await pollsCollection.find({}).toArray();

  return res.send(polls);
}

export async function getPollResult(req, res, next) {
  const winner = res.locals.winner;

  return res.status(202).send(winner);
}
