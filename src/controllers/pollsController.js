import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function postPoll(req, res) {
  const { title, expireAt } = req.body;

  pollsCollection.insertOne({ title, expireAt });

  return res.sendStatus(201);
}

export async function getPolls(req, res) {
  const polls = await pollsCollection.find({}).toArray();

  return res.send(polls);
}

export async function getPollResult(req, res, next) {
  const pollId = ObjectId(req.params.id);

  const poll = await pollsCollection.find({ _id: pollId }).toArray();

  const choices = await choicesCollection.find({ pollId: pollId }).toArray();

  let winnerOption = "";
  let qttVotes = 0;

  const promise = choices.map(async (choice) => {
    const votes = await votesCollection
      .find({ choiceId: choice._id })
      .toArray();

    if (votes.length > qttVotes) {
      winnerOption = choice.title;
      qttVotes = votes.length;
    }
  });

  await Promise.all(promise);

  const winner = {
    _id: pollId.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
    title: poll[0].title,
    expireAt: poll[0].expireAt,
    result: {
      title: winnerOption,
      votes: qttVotes,
    },
  };

  return res.status(202).send(winner);
}
