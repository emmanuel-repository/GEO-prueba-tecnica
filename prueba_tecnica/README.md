# Prueba Técnica — API REST Instrumentos Musicales

API REST desarrollada con **Spring Boot 3.2.4** para la gestión de instrumentos musicales y eventos (con control de stock de instrumentos por evento), con autenticación JWT y migraciones de base de datos con Flyway.

---

## Tecnologías utilizadas

- Java 17
- Spring Boot 3.2.4
- Spring Security + JWT
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway (migraciones de BD)
- Lombok
- Maven

---

## Requisitos previos

- Java 17+
- Maven 3.8+
- PostgreSQL corriendo en `localhost:5432`

---

## Configuración

### 1. Crear la base de datos en PostgreSQL

```sql
CREATE DATABASE prueba_tecnica_db;
```

### 2. Configurar credenciales

Las credenciales están en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/prueba_tecnica_db
spring.datasource.username=root
spring.datasource.password=12345
```

> Cambia `username` y `password` según tu configuración local.

---

## Migraciones con Flyway

El proyecto usa **Flyway** para gestionar el esquema de la base de datos.

### ¿Cómo funciona?

Al iniciar la aplicación, Flyway **ejecuta automáticamente** los archivos SQL en orden. No es necesario correr ningún comando manual.

### Archivos de migración

Los archivos se encuentran en:
```
src/main/resources/db/migration/
```

| Archivo | Descripción |
|---------|-------------|
| `V1__create_users_table.sql` | Crea la tabla `users` para autenticación |
| `V2__create_category_instruments_table.sql` | Crea la tabla `category_instruments` |
| `V3__create_musical_instruments_table.sql` | Crea la tabla `musical_instruments` |
| `V4__add_stock_to_musical_instruments.sql` | Agrega la columna `stock` a `musical_instruments` |
| `V5__create_events_table.sql` | Crea la tabla `events` |
| `V6__create_event_instruments_table.sql` | Crea la tabla intermedia `event_instruments` (instrumentos asignados a cada evento) |
| `V7__add_status_to_events.sql` | Agrega la columna `status` a `events` (1 = agendado, 0 = finalizado) |

### ⚠️ Importante

- **No es necesario** ejecutar `mvn flyway:migrate` manualmente
- Las migraciones corren solas al hacer `mvn spring-boot:run`
- **Nunca modifiques** un archivo de migración ya ejecutado — Flyway valida un checksum de cada archivo y fallará si detecta cambios
- Para nuevos cambios en la BD, crea un nuevo archivo con la siguiente versión disponible (p. ej. `V8__descripcion.sql`)

---

## Ejecución

```bash
# Instalar dependencias y compilar
mvn install

# Iniciar la aplicación (también ejecuta las migraciones)
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

---

## Endpoints

### 🔐 Autenticación — `/auth`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión y obtener token | No |

#### Registro
```json
POST /auth/register
{
  "username": "admin",
  "email": "admin@test.com",
  "password": "123456"
}
```

#### Login
```json
POST /auth/login
{
  "username": "admin",
  "password": "123456"
}
```

#### Respuesta exitosa
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "email": "admin@test.com"
}
```

---

### 🎸 Instrumentos Musicales — `/musical-instruments`

> Todos los endpoints requieren el header: `Authorization: Bearer <token>`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/musical-instruments` | Obtener todos los instrumentos |
| GET | `/musical-instruments/{id}` | Obtener instrumento por ID |
| GET | `/musical-instruments/categories` | Obtener todas las categorías |
| POST | `/musical-instruments` | Crear nuevo instrumento |
| PUT | `/musical-instruments/{id}` | Actualizar instrumento |
| DELETE | `/musical-instruments/{id}` | Eliminar instrumento |

#### Crear / Actualizar instrumento
```json
{
  "name": "Guitarra Fender Stratocaster",
  "type": "Guitarra Eléctrica",
  "price": 15000.00,
  "description": "Guitarra eléctrica de cuerpo sólido",
  "color": "Sunburst",
  "size": "Full",
  "brand": "Fender",
  "model": "Stratocaster",
  "categoryId": 1,
  "stock": 10
}
```

> El campo `stock` indica cuántas unidades del instrumento hay disponibles para asignar a eventos. No puede ser negativo.

---

### 🎉 Eventos — `/events`

> Todos los endpoints requieren el header: `Authorization: Bearer <token>`

Un evento puede tener asignados varios instrumentos (sin límite de cantidad de instrumentos distintos). Al asignar instrumentos a un evento se **descuenta su stock**; si no hay stock suficiente, la asignación falla. Al **finalizar** o **eliminar** un evento agendado, el stock de sus instrumentos se **devuelve**.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/events` | Obtener todos los eventos |
| GET | `/events/{id}` | Obtener evento por ID |
| POST | `/events` | Crear nuevo evento y asignar instrumentos (descuenta stock) |
| PUT | `/events/{id}` | Actualizar evento (recalcula el stock) |
| PUT | `/events/{id}/finalize` | Finalizar evento y devolver el stock de sus instrumentos |
| DELETE | `/events/{id}` | Eliminar evento (devuelve el stock si seguía agendado) |

#### Crear / Actualizar evento
```json
{
  "name": "Concierto de Primavera",
  "description": "Evento musical al aire libre",
  "eventDate": "2026-07-15T19:00:00",
  "location": "Auditorio Nacional",
  "instruments": [
    { "instrumentId": 1, "quantity": 3 },
    { "instrumentId": 2, "quantity": 1 }
  ]
}
```

> `eventDate` usa el formato ISO `yyyy-MM-ddTHH:mm:ss`.

#### Respuesta
```json
{
  "id": 1,
  "name": "Concierto de Primavera",
  "description": "Evento musical al aire libre",
  "eventDate": "2026-07-15T19:00:00",
  "location": "Auditorio Nacional",
  "status": 1,
  "instruments": [
    { "instrumentId": 1, "name": "Guitarra Fender Stratocaster", "quantity": 3 },
    { "instrumentId": 2, "name": "Bajo Jazz", "quantity": 1 }
  ]
}
```

> `status`: `1` = agendado, `0` = finalizado. Un evento finalizado no puede editarse ni finalizarse de nuevo.

---

## Manejo de errores

Las respuestas de error devuelven un cuerpo JSON con el formato `{ "error": "mensaje" }` (las validaciones de campos devuelven un objeto con un mensaje por campo).

| Código | Cuándo |
|--------|--------|
| `400 Bad Request` | Errores de validación de campos (campos vacíos, valores inválidos) |
| `404 Not Found` | Recurso no encontrado (ID inexistente) |
| `409 Conflict` | Violación de regla de negocio: stock insuficiente, evento ya finalizado, o editar un evento finalizado |

---

## Seguridad

- Autenticación basada en **JWT (JSON Web Token)**
- El token expira en **24 horas** (`86400000` ms)
- Los endpoints `/auth/**` son públicos
- Todos los demás endpoints requieren token válido en el header `Authorization`

---

## Colección Insomnia

El archivo `insomnia_collection.json` en la raíz del proyecto contiene todos los endpoints listos para importar en Insomnia.

```
Insomnia → File → Import → From File → insomnia_collection.json
```
