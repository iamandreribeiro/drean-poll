import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import {
  choicesCollection,
  pollsCollection,
  votesCollection,
} from "../database/db.js";
import { pollSchema } from "../models/pollModel.js";

export async function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  res.locals.title = title;
  res.locals.expireAt = expireAt ? expireAt : newExpireAt();

  const validation = pollSchema.validate(
    { title, expireAt },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return res.status(422).send(errors);
  }

  const pollExist = await pollsCollection.find({ title: title }).toArray();

  if (pollExist.length > 0) {
    return res.sendStatus(409);
  }

  next();
}

function newExpireAt() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return (
    `${date.toISOString().split("T")[0]}` + ` ` + `${dayjs().format("HH-mm")}`
  );
}

export async function pollResultValidation(req, res, next) {
  const pollId = ObjectId(req.params.id);

  const pollExist = await pollsCollection.find({ _id: pollId }).toArray();

  if (pollExist.length === 0) {
    return res.sendStatus(404);
  }

  const poll = await pollsCollection.find({ _id: pollId }).toArray();

  const choices = await choicesCollection.find({ pollId: pollId }).toArray();

  let winnerOption = "";
  let qttVotes = 0;
  let winnerNotExists = 1;

  const promise = choices.map(async (choice) => {
    const votes = await votesCollection
      .find({ choiceId: choice._id })
      .toArray();

    if (votes.length > qttVotes) {
      winnerOption = choice.title;
      qttVotes = votes.length;
    } else if (votes.length === qttVotes) {
      winnerNotExists++;
    }
  });

  await Promise.all(promise);

  res.locals.winner = {
    _id: pollId.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
    title: poll[0].title,
    expireAt: poll[0].expireAt,
    result: {
      title: winnerOption,
      votes: qttVotes,
    },
  };

  if (!winnerOption || winnerNotExists === choices.length) {
    return res.status(404).send("Não foi possível encontrar um vencedor 😥😥");
  }

  next();
}
