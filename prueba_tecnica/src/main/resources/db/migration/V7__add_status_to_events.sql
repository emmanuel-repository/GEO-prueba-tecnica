-- status: 1 = agendado, 0 = finalizado
ALTER TABLE events
    ADD COLUMN status INTEGER NOT NULL DEFAULT 1 CHECK (status IN (0, 1));
