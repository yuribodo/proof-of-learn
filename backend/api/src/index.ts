import cors from "cors";
import express from "express";
import { router } from "./route";

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_BASE_URL,
		credentials: true,
	})
);

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
