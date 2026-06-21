package com.GEO.prueba_tecnica.app.dto;


import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class MusicalInstrumentDto {
    
        @Data
        public static class CreateRequest {
        
            @NotBlank(message = "Campo 'nombre' no puede estar vacío")
            private String name;

            @NotBlank(message = "Campo 'tipo' no puede estar vacío")
            private String type;
            
            @NotNull(message = "Campo 'precio' no puede estar vacío")
            @Min(value = 0, message = "El precio no puede ser negativo")
            private BigDecimal price;

            @NotBlank(message = "Campo 'descripción' no puede estar vacío")
            private String description;

            @NotBlank(message = "Campo 'color' no puede estar vacío")
            private String color;    
            
            @NotBlank(message = "Campo 'tamaño' no puede estar vacío")
            private String size;

            @NotBlank(message = "Campo 'modelo' no puede estar vacío")
            private String model;

            @NotNull(message = "Campo 'Categoría' no puede estar vacío")
            @Min(value = 1, message = "El ID de categoría debe ser mayor a 0")
            private Integer categoryId;

            @NotBlank(message = "Campo 'marca' no puede estar vacío")
            private String brand;

            @NotNull(message = "Campo 'stock' no puede estar vacío")
            @Min(value = 0, message = "El stock no puede ser negativo")
            private Integer stock;
        }

        @Data
        public static class Response { 
            private Integer id;
            private String name;
            private String type;
            private BigDecimal price;
            private String description;
            private String color;    
            private String size;
            private String brand;
            private String model;
            private int categoryId;
            private Integer stock;

            public Response(Integer id, String name, String type, BigDecimal price, String description,
                            String color, String size, String brand, String model, int categoryId, Integer stock) {

                this.id = id;
                this.name = name;
                this.type = type;
                this.price = price;
                this.description = description;
                this.color = color;
                this.size = size;
                this.brand = brand;
                this.model = model;
                this.categoryId = categoryId;
                this.stock = stock;
            }
        }


}