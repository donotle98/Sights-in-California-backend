CREATE TABLE submissions(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    url TEXT NOT NULL
)