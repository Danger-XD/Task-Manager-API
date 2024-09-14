//necessary packages
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/api.js";
import {
    DATABASE,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    URL_ENCODE,
    WEB_CACHE
} from "./app/config/config.js";

//creating app instance variable
const app = express();

//default middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: URL_ENCODE }));
app.use(express.json({limit:MAX_JSON_SIZE}));

//APP rate limit
const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER});
app.use(limiter);

//cache
app.set("etag",WEB_CACHE);

//database connection
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("Database Connected!");
}).catch((err)=>{
    console.log("DB connection failed: " + err.message);
});

//base endpoint handler
app.use("/api",router);

app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT} successfully!`);
})