const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const bookmarksService = require("./bookmarks-service");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

const serializeBookmarks = (bookmark) => ({
    id: bookmark.id,
    first_name: bookmark.first_name,
    sightid: bookmark.sightid,
});
const serializeSight = (sight) => ({
    id: sight.id,
    name: sight.name,
    city: sight.city,
    description: sight.description,
    url: sight.url,
    image: sight.image,
});

bookmarksRouter
    .route("/")
    .get((req, res, next) => {
        const knex = req.app.get("db");
        bookmarksService
            .getAllBookmarks(knex)
            .then((bookmarks) => {
                res.json(bookmarks.map(serializeBookmarks));
            })
            .catch(next);
    })
    .post(bodyParser, (req, res, next) => {
        const knex = req.app.get("db");
        const { first_name, sightid } = req.body;

        const bookmark = {
            first_name,
            sightid,
        };

        bookmarksService
            .postBookmark(knex, bookmark)
            .then((bookmark) => {
                logger.info(
                    `Bookmark with sight id ${sightid} added by user ${first_name}`
                );
                bookmarksService
                    .getSightById(knex, bookmark.sightid)
                    .then((sight) => {
                        console.log(sight);
                        res.json(sight);
                    })
                    .catch(next);
            })
            .catch(next);
    });

bookmarksRouter.route("/:first_name").get((req, res, next) => {
    const knex = req.app.get("db");
    const { first_name } = req.params;
    bookmarksService
        .getSightsFromBookmarks(knex, first_name)
        .then((bookmarks) => {
            res.json(bookmarks);
        })
        .catch(next);
});

bookmarksRouter.route("/:sightid").delete((req, res, next) => {
    const knex = req.app.get("db");
    const { sightid } = req.params;
    bookmarksService
        .deleteBookmark(knex, sightid)
        .then(() => {
            logger.info(`Bookmark with sight id ${sightid} has been deleted`);
            res.status(204).end();
        })
        .catch(next);
});
module.exports = bookmarksRouter;
