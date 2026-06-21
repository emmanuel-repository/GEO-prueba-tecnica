# Graph Report - .  (2026-06-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 185 nodes · 288 edges · 21 communities (18 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5a0dbe63`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_JWT Token Management|JWT Token Management]]
- [[_COMMUNITY_Musical Instrument Controller|Musical Instrument Controller]]
- [[_COMMUNITY_Tool Execution Metadata|Tool Execution Metadata]]
- [[_COMMUNITY_Musical Instrument Services|Musical Instrument Services]]
- [[_COMMUNITY_User Authentication Repository|User Authentication Repository]]
- [[_COMMUNITY_Project Configuration and Migration|Project Configuration and Migration]]
- [[_COMMUNITY_User Entity Security|User Entity Security]]
- [[_COMMUNITY_Global Exception Handling|Global Exception Handling]]
- [[_COMMUNITY_Authentication Configuration Beans|Authentication Configuration Beans]]
- [[_COMMUNITY_Musical Instrument Data Models|Musical Instrument Data Models]]
- [[_COMMUNITY_Authentication Controller|Authentication Controller]]
- [[_COMMUNITY_JWT Authentication Filter|JWT Authentication Filter]]
- [[_COMMUNITY_Category Instrument DTOs|Category Instrument DTOs]]
- [[_COMMUNITY_Security Filter Chain|Security Filter Chain]]
- [[_COMMUNITY_Authentication Data Transfer|Authentication Data Transfer]]
- [[_COMMUNITY_Insomnia API Collection|Insomnia API Collection]]
- [[_COMMUNITY_Application Entry Point|Application Entry Point]]
- [[_COMMUNITY_Shell Tool Recording|Shell Tool Recording]]
- [[_COMMUNITY_Category Instrument Repository|Category Instrument Repository]]

## God Nodes (most connected - your core abstractions)
1. `JwtService` - 9 edges
2. `MusicalInstrumentServices` - 8 edges
3. `MusicalIntrumentController` - 7 edges
4. `ResponseEntity` - 7 edges
5. `User` - 7 edges
6. `String` - 7 edges
7. `tool_input` - 6 edges
8. `UserDetailsService` - 6 edges
9. `AuthenticationProvider` - 6 edges
10. `UserDetails` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Upgrade Plan: prueba_tecnica (20260621223240)` --references--> `Prueba Técnica — API REST Instrumentos Musicales`  [INFERRED]
  .github/modernize/java-upgrade/20260621223240/plan.md → README.md
- `Java 21` --conceptually_related_to--> `Java 17`  [INFERRED]
  .github/modernize/java-upgrade/20260621223240/plan.md → README.md
- `Upgrade Plan: prueba_tecnica (20260621223240)` --implements--> `maven-compiler-plugin 3.11.0`  [EXTRACTED]
  .github/modernize/java-upgrade/20260621223240/plan.md → pom.xml
- `User` --implements--> `UserDetails`  [EXTRACTED]
  src/main/java/com/GEO/prueba_tecnica/app/entity/User.java → src/main/java/com/GEO/prueba_tecnica/app/security/JwtService.java

## Import Cycles
- None detected.

## Communities (21 total, 3 thin omitted)

### Community 0 - "JWT Token Management"
Cohesion: 0.24
Nodes (10): Claims, Date, Function, Object, SecretKey, JwtService, Map, String (+2 more)

### Community 1 - "Musical Instrument Controller"
Cohesion: 0.25
Nodes (11): MusicalIntrumentController, DeleteMapping, GetMapping, PutMapping, CreateRequest, Integer, List, PostMapping (+3 more)

### Community 2 - "Tool Execution Metadata"
Cohesion: 0.12
Nodes (15): cwd, components, hook_event_name, session_id, timestamp, tool_input, details, event (+7 more)

### Community 3 - "Musical Instrument Services"
Cohesion: 0.24
Nodes (7): MusicalInstrument, MusicalInstrumentRepository, MusicalInstrumentServices, CreateRequest, Integer, List, Response

### Community 4 - "User Authentication Repository"
Cohesion: 0.23
Nodes (8): Optional, UserRepository, AuthService, String, AuthResponse, LoginRequest, RegisterRequest, User

### Community 5 - "Project Configuration and Migration"
Cohesion: 0.20
Nodes (8): Java 21, maven-compiler-plugin 3.11.0, Upgrade Plan: prueba_tecnica (20260621223240), Flyway, Java 17, PostgreSQL, Prueba Técnica — API REST Instrumentos Musicales, Spring Boot 3.2.4

### Community 6 - "User Entity Security"
Cohesion: 0.33
Nodes (4): Collection, User, GrantedAuthority, Override

### Community 7 - "Global Exception Handling"
Cohesion: 0.36
Nodes (7): GlobalExceptionHandle, ExceptionHandler, MethodArgumentNotValidException, RuntimeException, Map, ResponseEntity, String

### Community 8 - "Authentication Configuration Beans"
Cohesion: 0.56
Nodes (7): AuthenticationConfiguration, AuthenticationManager, AuthenticationProvider, ApplicationConfig, PasswordEncoder, Bean, UserDetailsService

### Community 9 - "Musical Instrument Data Models"
Cohesion: 0.25
Nodes (7): BigDecimal, CreateRequest, MusicalInstrumentDto, Response, MusicalInstrument, Integer, String

### Community 10 - "Authentication Controller"
Cohesion: 0.33
Nodes (6): AuthController, AuthResponse, LoginRequest, PostMapping, RegisterRequest, ResponseEntity

### Community 11 - "JWT Authentication Filter"
Cohesion: 0.39
Nodes (6): FilterChain, HttpServletRequest, HttpServletResponse, OncePerRequestFilter, JWT Authentication, Override

### Community 12 - "Category Instrument DTOs"
Cohesion: 0.29
Nodes (6): CategoryInstrumentDto, CreateRequest, Response, CategoryInstrument, Integer, String

### Community 13 - "Security Filter Chain"
Cohesion: 0.73
Nodes (5): SecurityConfig, CorsConfigurationSource, HttpSecurity, SecurityFilterChain, Bean

### Community 14 - "Authentication Data Transfer"
Cohesion: 0.33
Nodes (5): AuthDto, AuthResponse, LoginRequest, RegisterRequest, String

### Community 15 - "Insomnia API Collection"
Cohesion: 0.33
Nodes (5): __export_date, __export_format, __export_source, resources, _type

## Knowledge Gaps
- **48 isolated node(s):** `timestamp`, `hook_event_name`, `session_id`, `transcript_path`, `tool_name` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UserDetailsService` connect `Authentication Configuration Beans` to `JWT Authentication Filter`, `User Authentication Repository`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `UserDetails` connect `JWT Token Management` to `JWT Authentication Filter`, `User Entity Security`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `JWT Authentication` connect `JWT Authentication Filter` to `Project Configuration and Migration`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `timestamp`, `hook_event_name`, `session_id` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tool Execution Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._