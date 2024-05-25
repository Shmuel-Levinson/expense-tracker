// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { log } from "console";
import { Client } from "pg";
import sql from "sql-bricks";
import cors from "cors";
dotenv.config();
const client = new Client(process.env.DATABASE_URL);

async function sanityCheck() {
	const results = await client.query("SELECT NOW()");
	console.log(results.rows);
}
const initDb = async () => {
	await client.connect();
	try {
		await sanityCheck();
	} catch (err) {
		console.error("error executing query:", err);
	} finally {
		client.end();
	}
};

initDb();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: Function) => {
	next();
});

app.get("/ping", (req: Request, res: Response) => {
	res.send({ response: "pong", date: new Date() });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
