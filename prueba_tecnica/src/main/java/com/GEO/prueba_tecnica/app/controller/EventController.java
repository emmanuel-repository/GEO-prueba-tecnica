package com.GEO.prueba_tecnica.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GEO.prueba_tecnica.app.dto.EventDto;
import com.GEO.prueba_tecnica.app.services.EventService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    /*
     * Método para obtener todos los eventos
     */
    @GetMapping
    public ResponseEntity<List<EventDto.Response>> getAll() {
        return ResponseEntity.ok(eventService.getAll());
    }

    /*
     * Método para obtener un evento por su ID
     * 
     * @param id El ID del evento a obtener
     */
    @GetMapping("/{id}")
    public ResponseEntity<EventDto.Response> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(eventService.getById(id));
    }

    /*
     * Método para crear un nuevo evento
     * 
     * @param request Los datos para crear el nuevo evento
     */
    @PostMapping
    public ResponseEntity<EventDto.Response> create(
            @Valid @RequestBody EventDto.CreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.create(request));
    }

    /*
     * Método para actualizar un evento existente
     * 
     * @param id El ID del evento a actualizar
     * 
     * @param request Los datos para actualizar el evento
     */
    @PutMapping("/{id}")
    public ResponseEntity<EventDto.Response> update(@PathVariable Integer id,
            @Valid @RequestBody EventDto.CreateRequest request) {
        return ResponseEntity.ok(eventService.update(id, request));
    }

    /*
     * Método para finalizar un evento (devuelve el stock de los instrumentos)
     *
     * @param id El ID del evento a finalizar
     */
    @PutMapping("/{id}/finalize")
    public ResponseEntity<EventDto.Response> finalize(@PathVariable Integer id) {
        return ResponseEntity.ok(eventService.finalizeEvent(id));
    }

    /*
     * Método para eliminar un evento
     *
     * @param id El ID del evento a eliminar
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        eventService.deleteById(id);
        return ResponseEntity.ok("Evento eliminado con ID: " + id);
    }

}
