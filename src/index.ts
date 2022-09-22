import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Typescript and Node works")
})

app.listen(8080, () => {
    console.log("Running on 8080")
})