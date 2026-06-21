package com.GEO.prueba_tecnica.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GEO.prueba_tecnica.app.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
