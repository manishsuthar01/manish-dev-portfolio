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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://skillicons.dev",
          "https://res.cloudinary.com"
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);


app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json()); //to parse the incoming req with json payload

// used to serve static files such as html ,css images etc from the frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ROUTES
app.use("/api", indexRouter);
app.use((req, res) => {
  console.log("serving static files");
  return res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  // db connected
  connectToMongoDb();
  console.log(`server is started at PORT :${PORT}`);
});
