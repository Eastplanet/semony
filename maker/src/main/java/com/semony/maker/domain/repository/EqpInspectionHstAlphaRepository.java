package com.semony.maker.domain.repository;

import com.semony.maker.domain.entity.EqpInspectionHstAlpha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EqpInspectionHstAlphaRepository extends
    JpaRepository<EqpInspectionHstAlpha, Long> {
}
