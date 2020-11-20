const sightsService = {
    getAllSights(knex) {
        return knex.select("*").from("sights");
    },
    getSightByCity(knex, city) {
        return knex.from("sights").select("*").where("city", city);
    },
    addSight(knex, sight) {
        return knex
            .from("notes")
            .insert(sight)
            .returning("*")
            .then((sight) => sight[0]);
    },
    deleteSight(knex, id) {
        return knex.from("sights").where("id", id).delete();
    },
    updateSight(knex, id, sight) {
        return knex.from("sights").where("id", id).update(sight);
    },
};

module.exports = sightsService;
