const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const sightsService = require("./sights-service");

const sightsRouter = express.Router();
const bodyParser = express.json();

const serializeSight = (sight) => ({
    id: sight.id,
    name: sight.name,
    city: sight.city,
    description: sight.description,
    url: sight.url,
    image: sight.image,
});

sightsRouter
    .route("/")
    .all((req, res, next) => {
        const knex = req.app.get("db");
        sightsService
            .getAllSights(knex)
            .then((sights) => res.json(sights.map(serializeSight)))
            .catch(next);
    })
    .get((req, res, next) => {
        const knex = req.app.get("db");
        const { city } = req.params;
        sightsService
            .getSightByCity(knex, city)
            .then((sights) => res.json(sights.map(serializeSight)))
            .catch(next);
    })
    .post(bodyParser, (req, res, next) => {
        for (const field of ["name", "city", "description", "url"]) {
            if (!req.body[field]) {
                logger.error(`${field} is missing for sight post`);
                return res
                    .status(400)
                    .json({ error: { message: `${field} is missing` } });
            }
        }
        const newSight = {
            name: xss(req.body.name),
            city: xss(req.body.city),
            description: xss(req.body.description),
            url: xss(req.body.url),
        };
        sightsService
            .addSight(req.app.get("db"), newSight)
            .then((sight) => {
                console.log("sight", sight);
                logger.info(`note with id ${sight.id} created`);
                res.status(201).location(`/sights/${sight.id}`).json(sight);
            })
            .catch(next);
    });

sightsRouter.route("/:city").all((req, res, next) => {
    const knex = req.app.get("db");
    const { city } = req.params;

    sightsService
        .getSightByCity(knex, city)
        .then((sight) => {
            if (!sight) {
                logger.error(`Sight with city ${city} not found`);
                res.status(204).end();
            }
            res.sight = sight;
            const userSights = res.sight;
            res.json(userSights);
            next();
        })
        .catch(next);
});
module.exports = sightsRouter;
