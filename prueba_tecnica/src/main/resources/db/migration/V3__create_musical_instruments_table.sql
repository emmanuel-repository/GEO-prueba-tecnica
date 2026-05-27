CREATE TABLE musical_instruments (
    id          SERIAL          PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    type        VARCHAR(100)    NOT NULL,
    price       NUMERIC(10, 2)  NOT NULL,
    description VARCHAR(500)    NOT NULL,
    color       VARCHAR(100)    NOT NULL,
    size        VARCHAR(100)    NOT NULL,
    brand       VARCHAR(100)    NOT NULL,
    model       VARCHAR(100)    NOT NULL,
    category_id INTEGER         NOT NULL REFERENCES category_instruments(id)
);
