package com.GEO.prueba_tecnica.app.exception;

/*
 * Excepción para violaciones de reglas de negocio (p. ej. stock insuficiente,
 * evento ya finalizado). Se mapea a HTTP 409 Conflict en GlobalExceptionHandle.
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
