const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/router.js');
const restricted = require("../auth/restricted-middleware.js");

const server = express();

const sessionConfig = {
  name: 'alveRules', //default name is sid - always rename
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60,
    secure: false, //false in dvlpmt but will be true in production to send only over https
    httpOnly: true, //true means that JS in the browser or JS anywhere, will not have access
  },
  resave: false,
  saveUninitialized: true, //GDPR laws require you to ask the client - cannot set cookies to save automatically
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter)

server.use((err, req, res, next) => {
    console.log(err);
    res.json({message: "SERVERjs ERROR!"})
})
  
  module.exports = server;