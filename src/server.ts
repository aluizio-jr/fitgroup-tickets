import dotenv from "dotenv"
import { app } from "./app";

app.listen(3333, () => {
    dotenv.config()
} )