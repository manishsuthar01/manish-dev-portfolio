const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const indexRouter = require("./routes/index");
const connectToMongoDb = require("./db/index");
const helmet = require("helmet");
const morgan = require("morgan");


const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json()); //to parse the incoming req with json payload

// used to serve static files such as html ,css images etc from the frontend
app.use(express.static(path.join(__dirname, "../front_end/dist")));

// ROUTES

app.use((req,res)=>{
  return res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
});
app.use("/api", indexRouter);

app.listen(PORT, () => {
  // db connected
  connectToMongoDb();
  console.log(`server is started at PORT :${PORT}`);
});
