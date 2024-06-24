const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const app = express();
app.use(express.json());

// Use the MongoDB Atlas connection string
const atlasUrl = "mongodb+srv://21pa1a0518:OY18rabslSlTe9NU@uday.jank66a.mongodb.net/?retryWrites=true&w=majority&appName=Uday";

mongoose.connect(atlasUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("000");
}).catch(err => {
    console.log("The error is Occured!...", err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.on("connected", () => {
    console.log("-------------Connected to mapDB---------");
});

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
    console.log("the server is running on 8800");
});
