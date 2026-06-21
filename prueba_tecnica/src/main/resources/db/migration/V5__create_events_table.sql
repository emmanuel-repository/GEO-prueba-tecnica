CREATE TABLE events (
    id          SERIAL          PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    description VARCHAR(500)    NOT NULL,
    event_date  TIMESTAMP       NOT NULL,
    location    VARCHAR(255)    NOT NULL,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);
