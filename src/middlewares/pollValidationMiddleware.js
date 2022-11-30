import { ObjectId } from "mongodb";
import { pollsCollection } from "../database/db.js";
import { pollSchema } from "../models/pollModel.js";

export async function pollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  const validation = pollSchema.validate(
    { title, expireAt },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(422).send(errors);
  }

  next();
}

export async function pollResultValidation(req, res, next) {
  const pollId = ObjectId(req.params.id);

  const pollExist = await pollsCollection.find({_id: pollId}).toArray();

  if(pollExist.length === 0) {
    res.sendStatus(404);
  }

  next();
}