package com.GEO.prueba_tecnica.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class EventDto {

    @Data
    public static class CreateRequest {

        @NotBlank(message = "Campo 'nombre' no puede estar vacío")
        private String name;

        @NotBlank(message = "Campo 'descripción' no puede estar vacío")
        private String description;

        @NotNull(message = "Campo 'fecha del evento' no puede estar vacío")
        private LocalDateTime eventDate;

        @NotBlank(message = "Campo 'ubicación' no puede estar vacío")
        private String location;

        @NotEmpty(message = "Debe asignar al menos un instrumento al evento")
        @Valid
        private List<InstrumentAssignment> instruments;
    }

    @Data
    public static class InstrumentAssignment {

        @NotNull(message = "Campo 'instrumentId' no puede estar vacío")
        @Min(value = 1, message = "El ID del instrumento debe ser mayor a 0")
        private Integer instrumentId;

        @NotNull(message = "Campo 'cantidad' no puede estar vacío")
        @Min(value = 1, message = "La cantidad debe ser mayor a 0")
        private Integer quantity;
    }

    @Data
    public static class Response {
        private Integer id;
        private String name;
        private String description;
        private LocalDateTime eventDate;
        private String location;
        private Integer status;
        private List<AssignedInstrument> instruments;

        public Response(Integer id, String name, String description, LocalDateTime eventDate,
                        String location, Integer status, List<AssignedInstrument> instruments) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.eventDate = eventDate;
            this.location = location;
            this.status = status;
            this.instruments = instruments;
        }
    }

    @Data
    public static class AssignedInstrument {
       
        private Integer instrumentId;
        private String name;
        private Integer quantity;

        public AssignedInstrument(Integer instrumentId, String name, Integer quantity) {
            this.instrumentId = instrumentId;
            this.name = name;
            this.quantity = quantity;
        }
    }

}
