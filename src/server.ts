import { hostname } from "os";
import { app } from "./app";

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://${hostname}:${PORT}`);
} )