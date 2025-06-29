// import Node dependencies
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma/client');
const passport = require("passport");

// import routers
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");

// make an Express app
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up session persistence
app.use(
    expressSession({
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
        secret: process.env.SESSION_SECRET, 
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  // 2 minutes
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);
// allows passport to use "express-session" for its own session middlewares
app.use(passport.session());
// authenticate the user info upon log in
app.use(passport.authenticate('session'));

// Static file support: CSS fiels
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// save currentUser to locals object
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// handle paths / routing
app.use("/", indexRouter);
app.use('/', authRouter);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));