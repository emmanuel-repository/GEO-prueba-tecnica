package com.GEO.prueba_tecnica.app.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GEO.prueba_tecnica.app.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

    // ¿Existe algún evento con un status dado cuya fecha caiga en el rango (mismo día)?
    boolean existsByEventDateBetweenAndStatus(LocalDateTime start, LocalDateTime end, Integer status);

    // Igual, pero excluyendo un evento (para actualizaciones)
    boolean existsByEventDateBetweenAndStatusAndIdNot(LocalDateTime start, LocalDateTime end, Integer status, Integer id);
}
