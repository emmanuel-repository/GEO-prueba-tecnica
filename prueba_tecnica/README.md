# Prueba Técnica — API REST Instrumentos Musicales

API REST desarrollada con **Spring Boot 3.2.4** para la gestión de instrumentos musicales, con autenticación JWT y migraciones de base de datos con Flyway.

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

### ⚠️ Importante

- **No es necesario** ejecutar `mvn flyway:migrate` manualmente
- Las migraciones corren solas al hacer `mvn spring-boot:run`
- **Nunca modifiques** un archivo de migración ya ejecutado — Flyway valida un checksum de cada archivo y fallará si detecta cambios
- Para nuevos cambios en la BD, crea un nuevo archivo con la siguiente versión: `V4__descripcion.sql`

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
  "categoryId": 1
}
```

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
