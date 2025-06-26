// import Node dependencies
require("dotenv").config();
const path = require("node:path");
const express = require("express");

// import routers
const indexRouter = require("./routes/indexRouter");

// make an Express app
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up session persistence


// Static file support: CSS fiels
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// apply routers
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));