//* src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";

const app: Application = express();

app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send({
        Message: "Lostify server is running!",
    });
});

app.use("/api", routes);

export default app;
