import express from "express";
import { router } from "./route";
import cors from "cors"

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/api", router);


app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
