const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");

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

// ROUTES
app.use("/api", indexRouter);

app.listen(PORT, () => {
  // db connected
  connectToMongoDb();
  console.log(`server is started at PORT :${PORT}`);
});
