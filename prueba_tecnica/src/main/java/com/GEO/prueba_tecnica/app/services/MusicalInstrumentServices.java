package com.GEO.prueba_tecnica.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.GEO.prueba_tecnica.app.dto.CategoryInstrumentDto;
import com.GEO.prueba_tecnica.app.dto.MusicalInstrumentDto;
import com.GEO.prueba_tecnica.app.entity.CategoryInstrument;
import com.GEO.prueba_tecnica.app.entity.MusicalInstrument;
import com.GEO.prueba_tecnica.app.repository.CategoryInstrumentRepository;
import com.GEO.prueba_tecnica.app.repository.MusicalInstrumentRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicalInstrumentServices {

    private final MusicalInstrumentRepository musicalInstrumentRepository;
    private final CategoryInstrumentRepository categoryInstrumentRepository;

   /*
     * Método para crear un nuevo instrumento musical
     * 
     * @param request Los datos para crear el nuevo instrumento musical
     * 
     * @return Un objeto MusicalInstrumentDto.Response que representa el instrumento
     * musical creado
     */
    public MusicalInstrumentDto.Response create(MusicalInstrumentDto.CreateRequest request) {

        MusicalInstrument musicalInstrument = MusicalInstrument.builder()
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(request.getCategoryId())
                .color(request.getColor())
                .size(request.getSize())
                .model(request.getModel())
                .brand(request.getBrand())
                .price(request.getPrice())
                .type(request.getType())
                .stock(request.getStock())
                .build();

        musicalInstrument = musicalInstrumentRepository.save(musicalInstrument);

        return toResponse(musicalInstrument);

    }

    /*
     * Método para actualizar un instrumento musical por su ID
     * 
     * @param id El ID del instrumento musical a actualizar
     * 
     * @param request Los datos para actualizar el instrumento musical
     * 
     * @return Un objeto MusicalInstrumentDto.Response que representa el instrumento
     * musical actualizado
     * 
     * @throws RuntimeException Si no se encuentra un instrumento musical con el ID
     * proporcionado
     */
    public MusicalInstrumentDto.Response update(Integer id, MusicalInstrumentDto.CreateRequest request) {

        MusicalInstrument musicalInstrument = musicalInstrumentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento musical no encontrado con ID: " + id));

        musicalInstrument.setName(request.getName());
        musicalInstrument.setDescription(request.getDescription());
        musicalInstrument.setCategoryId(request.getCategoryId());
        musicalInstrument.setColor(request.getColor());
        musicalInstrument.setSize(request.getSize());
        musicalInstrument.setModel(request.getModel());
        musicalInstrument.setBrand(request.getBrand());
        musicalInstrument.setPrice(request.getPrice());
        musicalInstrument.setType(request.getType());
        musicalInstrument.setStock(request.getStock());

        musicalInstrument = musicalInstrumentRepository.save(musicalInstrument);

        return toResponse(musicalInstrument);
    }

    /*
     * Método para obtener un instrumento musical por su ID
     * 
     * @param id El ID del instrumento musical a obtener
     * 
     * @return Un objeto MusicalInstrumentDto.Response que representa el instrumento
     * musical encontrado
     * 
     * @throws RuntimeException Si no se encuentra un instrumento musical con el ID
     * proporcionado
     */
    public MusicalInstrumentDto.Response getById(Integer id) {

        MusicalInstrument musicalInstrument = musicalInstrumentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento musical no encontrado con ID: " + id));

        return toResponse(musicalInstrument);
    }

    /*
     * Método para obtener todos los instrumentos musicales
     * 
     * @return Una lista de objetos MusicalInstrumentDto.Response que representan
     * los instrumentos musicales encontrados
     */
    public List<MusicalInstrumentDto.Response> getAll() {

        List<MusicalInstrument> musicalInstruments = musicalInstrumentRepository.findAll();

        return musicalInstruments.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }


    /*
     * Método para obtener todas las categorías de instrumentos musicales
     * 
     * @return Una lista de objetos CategoryInstrumentDto.Response que representan
     * las categorías de instrumentos musicales encontradas
     */
    public List<CategoryInstrumentDto.Response> getAllCategories() {

        List<CategoryInstrument> categories = categoryInstrumentRepository.findAll();

        return categories.stream().map(category -> new CategoryInstrumentDto.Response(
                category.getId(),
                category.getName(),
                category.getDescription())).collect(Collectors.toList());
    }

    /*
     * Método para eliminar un instrumento musical por su ID
     * 
     * @param id El ID del instrumento musical a eliminar
     */
    public void deleteById(Integer id) {

        if (!musicalInstrumentRepository.existsById(id)) {
            throw new RuntimeException("El elemento que quiero eliminar no existe con ID: " + id);
        }

        musicalInstrumentRepository.deleteById(id);
    }

    /*
     * Método para convertir un objeto MusicalInstrument a un objeto
     * MusicalInstrumentDto.Response
     * 
     * @param musicalInstrument El instrumento musical a convertir
     * 
     * @return Un objeto MusicalInstrumentDto.Response que representa el instrumento
     * musical
     */
    private MusicalInstrumentDto.Response toResponse(MusicalInstrument musicalInstrument) {
        return new MusicalInstrumentDto.Response(
                musicalInstrument.getId(),
                musicalInstrument.getName(),
                musicalInstrument.getType(),
                musicalInstrument.getPrice(),
                musicalInstrument.getDescription(),
                musicalInstrument.getColor(),
                musicalInstrument.getSize(),
                musicalInstrument.getBrand(),
                musicalInstrument.getModel(),
                musicalInstrument.getCategoryId(),
                musicalInstrument.getStock());
    }

}
