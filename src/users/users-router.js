const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const usersService = require('./users-service');
const sanitizer = require('sanitize')();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');

const usersRouter = express.Router();
const bodyParser = express.json();

const serializeUser = (user) => ({
    id: user.id,
    first_name: xss(user.first_name),
    username: xss(user.username),
    password: xss(user.password),
    city: xss(user.city),
});

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knex = req.app.get('db');
        usersService
            .getAllUsers(knex)
            .then((users) => res.json(users.map(serializeUser)))
            .catch(next);
    })
    .post(bodyParser, async (req, res, next) => {
        for (const field of ['first_name', 'username', 'password', 'city']) {
            if (!req.body[field]) {
                logger.error(`${field} is missing for user post`);
                return res
                    .status(400)
                    .json({ error: { message: `${field} is missing` } });
            }
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(xss(req.body.password), salt);
        console.log(hashedPassword, salt);
        const newUser = {
            first_name: xss(req.body.first_name),
            username: xss(req.body.username),
            password: hashedPassword,
            city: xss(req.body.city),
        };
        usersService.addUser(req.app.get('db'), newUser);
        jwt.sign(
            { user: newUser },
            'secretKey',
            { expiresIn: '24h' },
            (err, token) => {
                console.log(token);
                res.send({
                    token,
                    newUser,
                });
            }
        );
    });

usersRouter
    .route('/:username')
    .all((req, res, next) => {
        const { username } = req.params;
        const knex = req.app.get('db');
        usersService
            .getUserByUsername(knex, username)
            .then((user) => {
                if (!user) {
                    logger.error(`User with username ${username} not found`);
                    return res
                        .status(400)
                        .json({ error: { message: 'User not found' } });
                }
                res.user = user;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user));
    })
    .delete((req, res, next) => {
        const { username } = req.params;
        usersService
            .deleteUser(req.app.get('db'), username)
            .then(() => {
                logger.info(`note with id ${username} deleted`);
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(bodyParser, (req, res, next) => {
        const userUpdate = req.body;
        const userUpdates = xss(userUpdate);
        console.log('userUpdates ', userUpdates);
        if (Object.keys(userUpdates).length === 0) {
            logger.info('user must have values to update');
            return res.status(400).json({
                error: { message: 'patch request must supply values' },
            });
        }
        usersService
            .updateUser(req.app.get('db'), res.user.id, userUpdates)
            .then((updatedUser) => {
                logger.info(`note with id ${res.user.id} updated`);
                res.status(204).end();
            });
    });

module.exports = usersRouter;
