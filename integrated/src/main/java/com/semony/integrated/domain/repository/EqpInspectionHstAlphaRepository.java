package com.semony.integrated.domain.repository;

import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EqpInspectionHstAlphaRepository extends
    JpaRepository<EqpInspectionHstAlpha, Long> {

    // lot_id, lot_seq, flow_recipe, slot_no가 같은 데이터 리스트 조회
    List<EqpInspectionHstAlpha> findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(String lotId,
        BigDecimal lotSeq, String flowRecipe, String slotNo);
}
