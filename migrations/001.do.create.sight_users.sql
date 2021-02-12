CREATE TABLE sight_users(
    userid BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    city VARCHAR(32) NOT NULL
);