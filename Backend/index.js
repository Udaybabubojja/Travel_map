const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

// Optionally, you can specify the origin explicitly:
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Use the MongoDB Atlas connection string with the 'Map' database name
const atlasUrl = "mongodb+srv://21pa1a0518:OY18rabslSlTe9NU@uday.jank66a.mongodb.net/Map?retryWrites=true&w=majority&appName=Uday";

mongoose.connect(atlasUrl, {
}).then(() => {
    console.log("Connected to the MongoDB Atlas");
}).catch(err => {
    console.log("An error occurred while connecting to MongoDB Atlas", err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.on("connected", () => {
    console.log("-------------Connected to Map database---------");
});

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
