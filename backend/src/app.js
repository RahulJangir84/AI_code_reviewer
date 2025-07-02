const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(cors());

// middleware to parse JSON bodies
app.use(express.json());

// middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/ai", aiRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world");
});


module.exports = app;
