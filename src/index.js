import express from "express";
import cors from "cors";
import pollsRoute from "./routes/pollsRoute.js";
import choicesRoute from "./routes/choicesRoute.js"
import votesRoute from "./routes/votesRoute.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use(pollsRoute);
app.use(choicesRoute);
app.use(votesRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port:` + port));