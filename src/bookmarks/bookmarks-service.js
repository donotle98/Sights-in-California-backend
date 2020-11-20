const bookmarksService = {
    getAllBookmarks(knex) {
        return knex.select("*").from("bookmarks");
    },
    getAllBookmarksByUser(knex, firstName) {
        return knex
            .select("*")
            .from("bookmarks")
            .where("first_name", firstName);
    },
    getSightById(knex, sightid) {
        return knex.from("sights").select("*").where("id", sightid);
    },
    getSightsFromBookmarks(knex, firstName) {
        return knex
            .from("bookmarks")
            .where("first_name", firstName)
            .join("sights", "sights.id", "=", "bookmarks.sightid")
            .select(
                "sights.id",
                "sights.name",
                "sights.city",
                "sights.description",
                "sights.url",
                "sights.image"
            );
    },
    postBookmark(knex, bookmark) {
        return knex
            .from("bookmarks")
            .insert(bookmark)
            .returning("*")
            .then((bookmark) => bookmark[0]);
    },
    deleteBookmark(knex, sightid) {
        return knex.from("bookmarks").where("sightid", sightid).delete();
    },
};
module.exports = bookmarksService;
