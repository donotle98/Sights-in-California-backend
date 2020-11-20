const loginServices = {
    getUserByUsername(knex, username) {
        return knex
            .select("*")
            .from("sight_users")
            .where("username", username)
            .first();
    },
};

module.exports = loginServices;
