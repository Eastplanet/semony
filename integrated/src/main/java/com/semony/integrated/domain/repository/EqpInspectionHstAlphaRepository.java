package com.semony.integrated.domain.repository;

import com.semony.integrated.domain.dto.WaferSpecificationValueDto;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EqpInspectionHstAlphaRepository extends
    JpaRepository<EqpInspectionHstAlpha, Long> {

    // lot_id, lot_seq, flow_recipe, slot_no가 같은 데이터 리스트 조회
    List<EqpInspectionHstAlpha> findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(String lotId,
        BigDecimal lotSeq, String flowRecipe, String slotNo);


    // @Query를 사용하여 DTO로 결과 조회
    @Query(
        "SELECT DISTINCT new com.semony.integrated.domain.dto.WaferSpecificationValueDto(e.lotId, e.lotSeq, e.flowRecipe, e.slotNo) "
            +
            "FROM EqpInspectionHstAlpha e " +
            "WHERE e.eventDtts BETWEEN :startDate AND :endDate")
    List<WaferSpecificationValueDto> findInspectionHistory(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}
