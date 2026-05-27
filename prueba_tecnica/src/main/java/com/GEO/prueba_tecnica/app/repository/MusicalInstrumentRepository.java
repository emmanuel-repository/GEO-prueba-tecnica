package com.GEO.prueba_tecnica.app.repository;

// import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.GEO.prueba_tecnica.app.entity.MusicalInstrument;

public interface MusicalInstrumentRepository extends JpaRepository<MusicalInstrument, Integer> {
    // List<MusicalInstrument> findByCategoryInstrument_Id(Integer categoryId);
}
