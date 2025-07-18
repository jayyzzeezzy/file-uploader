require("dotenv").config();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 10 characters.";
const alphaNumErr = "must only contain letters and/or numbers.";
const passwordErr = "must be between 5 and 20 characters.";

// validate user inputs
const validateUser = [
    body("username").trim().notEmpty()
        .isAlphanumeric().withMessage(`username ${alphaNumErr}`)
        .isLength({ min: 1, max: 30 }).withMessage(`username ${lengthErr}`)
// prevent duplicate username
        .custom(async value => {
            const user = await db.findUserByUsername(value);
            if (user) {
                throw new Error("Username already in use");
            }
        }),
// Does .withMessage() have greater priority than throw Error?-----------
    body("password").trim().notEmpty()
        .isLength({ min: 5, max: 20 }).withMessage(`password ${passwordErr}`),
    body("confirmPassword").trim().notEmpty()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
];

exports.postSignUp = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up", {
                errors: errors.array(),
            });
        }
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(username, hashedPassword);
        res.redirect("/");
    }
];

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

exports.getIndex = (req, res) => {
    res.render("index");
};

exports.getSignUp = (req, res) => {
    res.render("sign-up")
};

exports.getHome = async (req, res) => {
    // const files = await db.getAllFiles();
    const userId = req.user.id;
    const folders = await db.getAllFolders(userId);
    // console.log(folders);
    res.render("home", { results: folders });
}

exports.postUpload = async (req, res) => {
    const file = req.file;
    console.log(`uploaded file: ${req.file}`);
    res.render("home");
};

exports.getNewFolder = async (req, res) => {
    res.redirect("/home");
}

exports.postNewFolder = async (req, res) => {
    const userId = req.user.id;
    const { folderName } = req.body;
    // console.log(userId);
    await db.addAFolder(folderName, userId);
    res.redirect("/home");
}

exports.getFolderInfo = async (req, res) => {
    const userId = req.user.id;
    const { folderId } = req.params;
    const folderPath = await db.getFolderPath(userId, folderId);
    
    // console.log("folderPath: ", folderPath);
    res.render("folder", {
        folderId,
        folderPath,
    });
}

exports.postFolderToFolder = async (req, res) => {
    const userId = req.user.id;
    const { folderId } = req.params;
    const { folderName } = req.body;
    const folder = await db.addFolderToFolder(folderName, userId, folderId);
    console.log("addFolderToFolder: ", folder);
    res.redirect(`/folder/${folderId}`);
}

exports.getLogOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};