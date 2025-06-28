const { Router } = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

// import Primsa Client
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

const authRouter = Router();
