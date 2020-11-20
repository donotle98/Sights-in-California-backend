const usersService = {
    getAllUsers(knex) {
        return knex.select("*").from("sight_users");
    },
    getUserByUsername(knex, username) {
        return knex
            .select("*")
            .from("sight_users")
            .where("username", username)
            .first();
    },
    addUser(knex, user) {
        return knex
            .from("sight_users")
            .insert(user)
            .returning("*")
            .then((user) => user[0]);
    },
    deleteUser(knex, username) {
        return knex.from("sight_users").where("username", username).delete();
    },
    updateUser(knex, userId, user) {
        return knex.from("sight_users").where("userid", userId).update(user);
    },
};

module.exports = usersService;
