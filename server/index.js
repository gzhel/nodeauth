require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/index");
const errorMiddleware = require("./shared/middlewares/errorMiddleware");

const PORT =
  process.env.NODE_ENV === "test" ? process.env.LOCAL_PORT : process.env.PORT;

const CLIENT_URL =
  process.env.NODE_ENV === "test"
    ? process.env.LOCAL_CLIENT_URL
    : process.env.CLIENT_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use("/api", router);
// error middleware always should be last
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server working in port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
