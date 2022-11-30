import { choicesCollection, pollsCollection } from "../database/db.js";
import { postChoiceSchema } from "../models/choicesModel.js";
import dayjs from "dayjs";
import moment from "moment";
import { ObjectId } from "mongodb";

export async function choiceValidation(req, res, next) {
  const title = req.body.title;
  const pollId = ObjectId(req.body.pollId);

  const validation = postChoiceSchema.validate({ title });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return res.status(422).send(errors);
  }

  const poll = await pollsCollection.find({ _id: pollId }).toArray();

  if (poll.length === 0) {
    return res.sendStatus(404);
  }

  const choice = await choicesCollection.find({ title }).toArray();

  if (choice.length !== 0) {
    return res.sendStatus(409);
  }

  const date = dayjs().format("YYYY-MM-DD HH:mm");

  if (moment(date).isAfter(poll[0].expireAt)) {
    return res.sendStatus(403);
  }

  next();
}

export async function choiceOptionValidation(req, res, next) {
  const pollId = ObjectId(req.params.id);

  const poll = await choicesCollection.find({ pollId }).toArray();

  if (poll.length === 0) {
    return res.sendStatus(404);
  }

  next();
}
