const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const router = require("./router");
const app = express();

const SERVER = "127.0.0.1:27017";
const DB = "spa-react";
const Mongo_Shall = `mongodb://${SERVER}/${DB}`;

const PORT = process.env.PORT || 5000;

const connection = mongoose.connection;
const option = {
    socketTimeoutMS: 3000000,
    reconnectTries: 3000000,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(Mongo_Shall);

client.connect(err => {
    if (err) console.log("Error occurred while connecting to MongoDB...", err);
    console.log("Connected to Mongodb");
    client.close();
});
  
mongoose.Promise = Promise;
mongoose.connect(Mongo_Shall, option);
  
connection.on("connected", () => console.log("Connected to database"));
connection.on("error", err => console.log("Connection failed with - ", err));

app
    .use(express.static(path.join(__dirname, "client/build")))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .use("/", router)
    .listen(PORT, () => console.log(`App listening on port ${PORT}!`));