package com.GEO.prueba_tecnica.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "event_instruments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventInstrument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "instrument_id", nullable = false)
    private Integer instrumentId;

    @Column(nullable = false)
    private Integer quantity;

}
