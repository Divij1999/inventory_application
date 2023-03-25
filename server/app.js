const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://Expressuser:4KAEF5pXnwq5JSH@cluster0.kfqzx4e.mongodb.net/?retryWrites=true&w=majority";

const main = async () => {
  await mongoose.connect(mongoDB, {
    dbName: "inventory_application",
  });
  console.log(mongoose.connection.readyState);
};

main().catch((err) => console.log(err));

const logger = require("morgan");

const indexRouter = require("./routes/index");
const partsRouter = require("./routes/partsRouter");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/parts", partsRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
