const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const app = express();
app.use(express.json())
const url = "mongodb://127.0.0.1:27017/MapDB";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("000");
}).catch(err => {
    console.log("The error is Occured!...")
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
