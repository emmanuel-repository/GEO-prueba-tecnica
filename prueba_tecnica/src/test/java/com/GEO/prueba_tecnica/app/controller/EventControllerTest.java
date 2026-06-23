package com.GEO.prueba_tecnica.app.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.GEO.prueba_tecnica.app.config.SecurityConfig;
import com.GEO.prueba_tecnica.app.dto.EventDto;
import com.GEO.prueba_tecnica.app.exception.BusinessException;
import com.GEO.prueba_tecnica.app.security.JwtAuthenticationFilter;
import com.GEO.prueba_tecnica.app.services.EventService;

// Slice de la capa web: solo carga EventController + el @RestControllerAdvice.
// Excluimos la config de seguridad y el filtro JWT (dependen de beans fuera del slice);
// addFilters = false desactiva la cadena de seguridad para probar el endpoint aislado.
@WebMvcTest(controllers = EventController.class,
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = { SecurityConfig.class, JwtAuthenticationFilter.class }))
@AutoConfigureMockMvc(addFilters = false)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    private EventDto.Response sampleResponse(Integer status) {
        return new EventDto.Response(
                1, "Festival", "desc",
                LocalDateTime.of(2026, 7, 15, 19, 0), "Auditorio", status,
                List.of(new EventDto.AssignedInstrument(1, "Guitarra", 2)));
    }

    private static final String VALID_BODY = """
            {
              "name": "Festival",
              "description": "desc",
              "eventDate": "2026-07-15T19:00:00",
              "location": "Auditorio",
              "instruments": [ { "instrumentId": 1, "quantity": 2 } ]
            }
            """;

    @Test
    void getAll_devuelve200YLaLista() throws Exception {
        when(eventService.getAll()).thenReturn(List.of(sampleResponse(1)));

        mockMvc.perform(get("/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Festival"))
                .andExpect(jsonPath("$[0].status").value(1));
    }

    @Test
    void create_conBodyValido_devuelve201() throws Exception {
        when(eventService.create(any())).thenReturn(sampleResponse(1));

        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_BODY))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.instruments[0].name").value("Guitarra"));
    }

    @Test
    void create_conBodyInvalido_devuelve400() throws Exception {
        // body vacío → fallan las validaciones @NotBlank / @NotEmpty
        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_cuandoNoHayStock_devuelve409() throws Exception {
        when(eventService.create(any()))
                .thenThrow(new BusinessException("Stock insuficiente para el instrumento 'Guitarra'"));

        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_BODY))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("Stock insuficiente para el instrumento 'Guitarra'"));
    }

    @Test
    void finalize_devuelve200YStatus0() throws Exception {
        when(eventService.finalizeEvent(eq(1))).thenReturn(sampleResponse(0));

        mockMvc.perform(put("/events/1/finalize"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(0));
    }

    @Test
    void delete_devuelve200() throws Exception {
        mockMvc.perform(delete("/events/1"))
                .andExpect(status().isOk());
    }
}
