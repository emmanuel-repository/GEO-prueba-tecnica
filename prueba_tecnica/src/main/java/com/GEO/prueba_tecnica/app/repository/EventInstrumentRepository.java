package com.GEO.prueba_tecnica.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GEO.prueba_tecnica.app.entity.EventInstrument;

public interface EventInstrumentRepository extends JpaRepository<EventInstrument, Integer> {

    List<EventInstrument> findByEventId(Integer eventId);

    void deleteByEventId(Integer eventId);
}
