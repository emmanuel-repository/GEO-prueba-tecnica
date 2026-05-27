package com.GEO.prueba_tecnica.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GEO.prueba_tecnica.app.entity.CategoryInstrument;

public interface CategoryInstrumentRepository extends JpaRepository<CategoryInstrument, Integer> {

    // List<CategoryInstrument> findByCategoryInstrumentId(Integer id);
}
