package com.GEO.prueba_tecnica.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


public class CategoryInstrumentDto {
        
    @Data
    public static class CreateRequest {
        
        @NotBlank(message = "Campo 'nombre' no puede estar vacío")
        private String name;

        @NotBlank(message = "Campo 'descripción' no puede estar vacío")
        private String description;
    }


    @Data
    public static class Response { 
        private Integer id;
        private String name;
        private String description;

        public Response(Integer id, String name, String description) {
            this.id = id;
            this.name = name;
            this.description = description;
        }
    }

}

