CREATE TABLE event_instruments (
    id            SERIAL      PRIMARY KEY,
    event_id      INTEGER     NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    instrument_id INTEGER     NOT NULL REFERENCES musical_instruments(id),
    quantity      INTEGER     NOT NULL CHECK (quantity > 0),
    UNIQUE (event_id, instrument_id)
);
