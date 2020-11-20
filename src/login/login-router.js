const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const sanitizer = require("sanitize")();
const jwt = require("jsonwebtoken");
const loginServices = require("./login-service");

const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");

const loginRouter = express.Router();
const bodyParser = express.json();

const serializeUser = (user) => ({
    id: user.id,
    first_name: xss(user.first_name),
    username: xss(user.username),
    password: xss(user.password),
    city: xss(user.city),
});

loginRouter
    .route("/")
    .get((req, res, next) => {
        res.send("helllloooo");
    })
    .post(bodyParser, async (req, res, next) => {
        const { username, password } = req.body;

        const user = {
            username,
            password,
        };

        jwt.sign(
            { user: user },
            "secretKey",
            { expiresIn: "24h" },
            (err, token) => {
                res.send({
                    token,
                });
            }
        );
    });
loginRouter
    .route("/:username")
    .all(verifyToken, async (req, res, next) => {
        const { username } = req.params;
        jwt.verify(req.token, "secretKey", (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                loginServices
                    .getUserByUsername(req.app.get("db"), username)
                    .then((user) => {
                        if (!user) {
                            logger.error(
                                `User with username ${username} not found`
                            );
                            return res
                                .status(400)
                                .json({ error: { message: "User not found" } });
                        }
                        res.user = user;
                        next();
                    })
                    .catch(next);
            }
        });
    })
    .get((req, res) => {
        res.json(serializeUser(res.user));
    });

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
module.exports = loginRouter;
