CREATE TABLE bookmarks(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    sightId INT REFERENCES sights(id)
);