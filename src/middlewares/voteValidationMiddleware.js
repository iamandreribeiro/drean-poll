import dayjs from "dayjs";
import moment from "moment";
import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function voteValidation(req, res, next) {
  const choiceId = ObjectId(req.params.id);

  const choiceExist = await choicesCollection.find({ _id: choiceId }).toArray();

  if (choiceExist.length === 0) {
    return res.sendStatus(404);
  }

  const pollId = choiceExist[0].pollId;
  
  const poll = await pollsCollection.find({ _id: pollId}).toArray();

  const date = dayjs().format("YYYY-MM-DD HH:mm");

  if (moment(date).isAfter(poll[0].expireAt)) {
    return res.sendStatus(403);
  }

  next();
}
