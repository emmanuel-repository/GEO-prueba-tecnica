package com.GEO.prueba_tecnica.app.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.GEO.prueba_tecnica.app.dto.EventDto;
import com.GEO.prueba_tecnica.app.entity.Event;
import com.GEO.prueba_tecnica.app.entity.EventInstrument;
import com.GEO.prueba_tecnica.app.entity.MusicalInstrument;
import com.GEO.prueba_tecnica.app.exception.BusinessException;
import com.GEO.prueba_tecnica.app.repository.EventInstrumentRepository;
import com.GEO.prueba_tecnica.app.repository.EventRepository;
import com.GEO.prueba_tecnica.app.repository.MusicalInstrumentRepository;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private EventInstrumentRepository eventInstrumentRepository;

    @Mock
    private MusicalInstrumentRepository musicalInstrumentRepository;

    @InjectMocks
    private EventService eventService;

    private static final LocalDateTime FECHA = LocalDateTime.of(2026, 7, 15, 19, 0);

    // ---------- helpers ----------

    private MusicalInstrument instrument(Integer id, int stock) {
        return MusicalInstrument.builder().id(id).name("Guitarra").stock(stock).build();
    }

    private Event event(Integer id, int status) {
        return Event.builder()
                .id(id).name("Festival").description("desc")
                .eventDate(FECHA).location("Auditorio").status(status)
                .build();
    }

    private EventDto.CreateRequest createRequest(Integer instrumentId, int quantity) {
        EventDto.InstrumentAssignment assignment = new EventDto.InstrumentAssignment();
        assignment.setInstrumentId(instrumentId);
        assignment.setQuantity(quantity);

        EventDto.CreateRequest request = new EventDto.CreateRequest();
        request.setName("Festival");
        request.setDescription("desc");
        request.setEventDate(FECHA);
        request.setLocation("Auditorio");
        request.setInstruments(List.of(assignment));
        return request;
    }

    private EventInstrument eventInstrument(Integer eventId, Integer instrumentId, int quantity) {
        return EventInstrument.builder()
                .eventId(eventId).instrumentId(instrumentId).quantity(quantity)
                .build();
    }

    // ---------- create ----------

    @Test
    void create_descuentaStockYGuardaElEvento() {
        MusicalInstrument guitarra = instrument(1, 5);

        when(eventRepository.existsByEventDateBetweenAndStatus(any(), any(), eq(1))).thenReturn(false);
        when(eventRepository.save(any(Event.class))).thenReturn(event(10, 1));
        when(musicalInstrumentRepository.findById(1)).thenReturn(Optional.of(guitarra));
        // getById(10) al final del create
        when(eventRepository.findById(10)).thenReturn(Optional.of(event(10, 1)));
        when(eventInstrumentRepository.findByEventId(10))
                .thenReturn(List.of(eventInstrument(10, 1, 2)));

        EventDto.Response response = eventService.create(createRequest(1, 2));

        assertThat(response.getId()).isEqualTo(10);
        assertThat(response.getStatus()).isEqualTo(1);
        assertThat(guitarra.getStock()).isEqualTo(3); // 5 - 2
        verify(eventInstrumentRepository).save(any(EventInstrument.class));
    }

    @Test
    void create_lanzaExcepcionSiNoHayStockSuficiente() {
        when(eventRepository.existsByEventDateBetweenAndStatus(any(), any(), eq(1))).thenReturn(false);
        when(eventRepository.save(any(Event.class))).thenReturn(event(10, 1));
        when(musicalInstrumentRepository.findById(1)).thenReturn(Optional.of(instrument(1, 1)));

        assertThatThrownBy(() -> eventService.create(createRequest(1, 5)))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Stock insuficiente");

        verify(eventInstrumentRepository, never()).save(any());
    }

    @Test
    void create_lanzaExcepcionSiYaExisteEventoEseDia() {
        when(eventRepository.existsByEventDateBetweenAndStatus(any(), any(), eq(1))).thenReturn(true);

        assertThatThrownBy(() -> eventService.create(createRequest(1, 1)))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Ya existe un evento agendado para esa fecha");

        verify(eventRepository, never()).save(any());
    }

    // ---------- finalize ----------

    @Test
    void finalize_devuelveStockYMarcaComoFinalizado() {
        Event agendado = event(1, 1);
        MusicalInstrument guitarra = instrument(1, 3);

        when(eventRepository.findById(1)).thenReturn(Optional.of(agendado));
        when(eventInstrumentRepository.findByEventId(1))
                .thenReturn(List.of(eventInstrument(1, 1, 2)));
        when(musicalInstrumentRepository.findById(1)).thenReturn(Optional.of(guitarra));

        EventDto.Response response = eventService.finalizeEvent(1);

        assertThat(response.getStatus()).isEqualTo(0);
        assertThat(guitarra.getStock()).isEqualTo(5); // 3 + 2 devueltos
        verify(eventRepository).save(agendado);
    }

    @Test
    void finalize_lanzaExcepcionSiYaEstaFinalizado() {
        when(eventRepository.findById(1)).thenReturn(Optional.of(event(1, 0)));

        assertThatThrownBy(() -> eventService.finalizeEvent(1))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("ya está finalizado");

        verify(eventRepository, never()).save(any());
    }

    // ---------- delete ----------

    @Test
    void delete_noDevuelveStockSiElEventoYaEstabaFinalizado() {
        when(eventRepository.findById(1)).thenReturn(Optional.of(event(1, 0)));

        eventService.deleteById(1);

        // status = 0 → no se debe restaurar stock
        verify(eventInstrumentRepository, never()).findByEventId(anyInt());
        verify(musicalInstrumentRepository, never()).save(any());
        verify(eventInstrumentRepository).deleteByEventId(1);
        verify(eventRepository).deleteById(1);
    }
}
