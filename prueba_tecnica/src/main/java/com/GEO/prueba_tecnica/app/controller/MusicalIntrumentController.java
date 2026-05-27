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

import com.GEO.prueba_tecnica.app.dto.CategoryInstrumentDto;
import com.GEO.prueba_tecnica.app.dto.MusicalInstrumentDto;
import com.GEO.prueba_tecnica.app.services.MusicalInstrumentServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/musical-instruments")
@RequiredArgsConstructor
public class MusicalIntrumentController {

    private final MusicalInstrumentServices musicalInstrumentService;

    /*
     * Método para obtener todos los instrumentos musicales
     */
    @GetMapping
    public ResponseEntity<List<MusicalInstrumentDto.Response>> getAll() {
        return ResponseEntity.ok(musicalInstrumentService.getAll());
    }

    /*
     * Método para obtener un instrumento musical por su ID
     * @param id El ID del instrumento musical a obtener
     */
    @GetMapping("/{id}")
    public ResponseEntity<MusicalInstrumentDto.Response> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(musicalInstrumentService.getById(id));
    }

    /*
     * Método para obtener todas las categorías de instrumentos musicales
     */
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryInstrumentDto.Response>> getAllCategories() {
        return ResponseEntity.ok(musicalInstrumentService.getAllCategories());
    }

    /*
     * Método para crear un nuevo instrumento musical
     * @param request Los datos para crear el nuevo instrumento musical
     */
    @PostMapping
    public ResponseEntity<MusicalInstrumentDto.Response> create(
            @Valid @RequestBody MusicalInstrumentDto.CreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(musicalInstrumentService.create(request));
    }

    /*
     * Método para actualizar un instrumento musical existente
     * @param id El ID del instrumento musical a actualizar
     * @param request Los datos para actualizar el instrumento musical
     */
    @PutMapping("/{id}")
    public ResponseEntity<MusicalInstrumentDto.Response> update(
            @PathVariable Integer id,
            @Valid @RequestBody MusicalInstrumentDto.CreateRequest request) {
        return ResponseEntity.ok(musicalInstrumentService.update(id, request));
    }

    /*
     * Método para eliminar un instrumento musical
     * @param id El ID del instrumento musical a eliminar
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        musicalInstrumentService.deleteById(id);
        return ResponseEntity.ok("Instrumento musical eliminado con ID: " + id);
    }
  
}
