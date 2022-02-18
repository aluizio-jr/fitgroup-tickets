import dotenv from "dotenv"
import { hostname } from "os";
import { app } from "./app";

const PORT = 3333;
app.listen(PORT, () => {
    dotenv.config(),
    console.log(`⚡️[server]: Server is running at http://${hostname}:${PORT}`);
} )