import express from "express";
import 'dotenv/config'
import { connectdb } from "./config/dataBase.js";
import { apiRouter} from "./router/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
connectdb();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","https://srmecom.netlify.app"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.use("/api",apiRouter)