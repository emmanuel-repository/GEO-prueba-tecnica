package com.GEO.prueba_tecnica.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.GEO.prueba_tecnica.app.dto.EventDto;
import com.GEO.prueba_tecnica.app.entity.Event;
import com.GEO.prueba_tecnica.app.entity.EventInstrument;
import com.GEO.prueba_tecnica.app.entity.MusicalInstrument;
import com.GEO.prueba_tecnica.app.exception.BusinessException;
import com.GEO.prueba_tecnica.app.repository.EventInstrumentRepository;
import com.GEO.prueba_tecnica.app.repository.EventRepository;
import com.GEO.prueba_tecnica.app.repository.MusicalInstrumentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventInstrumentRepository eventInstrumentRepository;
    private final MusicalInstrumentRepository musicalInstrumentRepository;

    /*
     * Método para crear un nuevo evento y asignarle instrumentos.
     * Descuenta el stock de cada instrumento asignado.
     *
     * @param request Los datos del evento y los instrumentos a asignar
     *
     * @return Un objeto EventDto.Response que representa el evento creado
     *
     * @throws RuntimeException Si un instrumento no existe o no tiene stock suficiente
     */
    @Transactional
    public EventDto.Response create(EventDto.CreateRequest request) {

        Event event = Event.builder()
                .name(request.getName())
                .description(request.getDescription())
                .eventDate(request.getEventDate())
                .location(request.getLocation())
                .status(1) // 1 = agendado
                .build();

        event = eventRepository.save(event);

        assignInstruments(event.getId(), request.getInstruments());

        return getById(event.getId());
    }

    /*
     * Método para actualizar un evento existente.
     * Devuelve el stock de las asignaciones anteriores, las elimina y aplica las
     * nuevas (descontando stock de nuevo). Así un cambio en la lista de instrumentos
     * queda siempre consistente.
     *
     * @param id El ID del evento a actualizar
     *
     * @param request Los nuevos datos del evento y sus instrumentos
     *
     * @return Un objeto EventDto.Response que representa el evento actualizado
     *
     * @throws RuntimeException Si el evento no existe, o si un instrumento no existe
     * o no tiene stock suficiente
     */
    @Transactional
    public EventDto.Response update(Integer id, EventDto.CreateRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + id));

        if (event.getStatus() == 0) {
            throw new BusinessException("No se puede editar un evento finalizado");
        }

        event.setName(request.getName());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setLocation(request.getLocation());
        eventRepository.save(event);

        // Devolver el stock de las asignaciones actuales antes de reemplazarlas
        restoreStock(id);
        eventInstrumentRepository.deleteByEventId(id);

        assignInstruments(id, request.getInstruments());

        return getById(id);
    }

    /*
     * Método para obtener un evento por su ID con sus instrumentos asignados.
     *
     * @param id El ID del evento a obtener
     *
     * @return Un objeto EventDto.Response que representa el evento encontrado
     *
     * @throws RuntimeException Si no se encuentra un evento con el ID proporcionado
     */
    public EventDto.Response getById(Integer id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + id));

        return toResponse(event);
    }

    /*
     * Método para obtener todos los eventos con sus instrumentos asignados.
     *
     * @return Una lista de objetos EventDto.Response
     */
    public List<EventDto.Response> getAll() {

        return eventRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /*
     * Método para eliminar un evento por su ID.
     * Antes de eliminar devuelve el stock de los instrumentos asignados.
     *
     * @param id El ID del evento a eliminar
     *
     * @throws RuntimeException Si no se encuentra un evento con el ID proporcionado
     */
    @Transactional
    public void deleteById(Integer id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El evento que quiero eliminar no existe con ID: " + id));

        // Solo devolver stock si el evento seguía agendado; si ya estaba
        // finalizado, el stock ya fue devuelto y no debe contarse dos veces.
        if (event.getStatus() == 1) {
            restoreStock(id);
        }

        eventInstrumentRepository.deleteByEventId(id);
        eventRepository.deleteById(id);
    }

    /*
     * Método para finalizar un evento. Devuelve el stock de los instrumentos
     * asignados y marca el evento como finalizado (status = 0), conservando el
     * registro de qué instrumentos usó.
     *
     * @param id El ID del evento a finalizar
     *
     * @return Un objeto EventDto.Response que representa el evento finalizado
     *
     * @throws RuntimeException Si el evento no existe o ya está finalizado
     */
    @Transactional
    public EventDto.Response finalizeEvent(Integer id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + id));

        if (event.getStatus() == 0) {
            throw new BusinessException("El evento ya está finalizado");
        }

        restoreStock(id);
        event.setStatus(0); // 0 = finalizado
        eventRepository.save(event);

        return getById(id);
    }

    /*
     * Asigna una lista de instrumentos a un evento, validando existencia y stock,
     * descontando el stock y guardando cada asignación.
     *
     * @param eventId El ID del evento al que se asignan los instrumentos
     *
     * @param assignments La lista de instrumentos y cantidades a asignar
     *
     * @throws RuntimeException Si un instrumento no existe o no tiene stock suficiente
     */
    private void assignInstruments(Integer eventId, List<EventDto.InstrumentAssignment> assignments) {

        for (EventDto.InstrumentAssignment assignment : assignments) {

            MusicalInstrument instrument = musicalInstrumentRepository.findById(assignment.getInstrumentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Instrumento musical no encontrado con ID: " + assignment.getInstrumentId()));

            if (instrument.getStock() < assignment.getQuantity()) {
                throw new BusinessException(
                        "Stock insuficiente para el instrumento '" + instrument.getName() + "'. Disponible: "
                                + instrument.getStock() + ", solicitado: " + assignment.getQuantity());
            }

            instrument.setStock(instrument.getStock() - assignment.getQuantity());
            musicalInstrumentRepository.save(instrument);

            EventInstrument eventInstrument = EventInstrument.builder()
                    .eventId(eventId)
                    .instrumentId(assignment.getInstrumentId())
                    .quantity(assignment.getQuantity())
                    .build();

            eventInstrumentRepository.save(eventInstrument);
        }
    }

    /*
     * Devuelve al stock las cantidades de los instrumentos asignados a un evento.
     *
     * @param eventId El ID del evento cuyas asignaciones se liberan
     */
    private void restoreStock(Integer eventId) {

        List<EventInstrument> assignments = eventInstrumentRepository.findByEventId(eventId);

        for (EventInstrument assignment : assignments) {
            musicalInstrumentRepository.findById(assignment.getInstrumentId())
                    .ifPresent(instrument -> {
                        instrument.setStock(instrument.getStock() + assignment.getQuantity());
                        musicalInstrumentRepository.save(instrument);
                    });
        }
    }

    /*
     * Convierte un Event y sus asignaciones en un EventDto.Response.
     *
     * @param event El evento a convertir
     *
     * @return Un objeto EventDto.Response con los instrumentos asignados
     */
    private EventDto.Response toResponse(Event event) {

        List<EventDto.AssignedInstrument> instruments = eventInstrumentRepository.findByEventId(event.getId())
                .stream()
                .map(assignment -> {
                    String name = musicalInstrumentRepository.findById(assignment.getInstrumentId())
                            .map(MusicalInstrument::getName)
                            .orElse(null);
                    return new EventDto.AssignedInstrument(
                            assignment.getInstrumentId(),
                            name,
                            assignment.getQuantity());
                })
                .collect(Collectors.toList());

        return new EventDto.Response(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getEventDate(),
                event.getLocation(),
                event.getStatus(),
                instruments);
    }

}
