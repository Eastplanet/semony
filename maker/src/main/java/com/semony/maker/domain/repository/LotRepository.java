package com.semony.maker.domain.repository;

import com.semony.maker.domain.entity.EqpInspectionHstAlpha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LotRepository extends JpaRepository<EqpInspectionHstAlpha, Long> {

    @Query("SELECT l.lotId FROM EqpInspectionHstAlpha l ORDER BY l.lotId DESC LIMIT 1")
    String findLatestLotId();

    @Query("SELECT l.lotSeq FROM EqpInspectionHstAlpha l ORDER BY l.lotSeq DESC LIMIT 1")
    String findLatestLotSeq();
}
