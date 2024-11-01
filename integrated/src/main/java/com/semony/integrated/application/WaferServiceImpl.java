package com.semony.integrated.application;

import com.semony.integrated.domain.dto.EqpInspectionHstAlphaConvertor;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import com.semony.integrated.domain.repository.EqpInspectionHstAlphaRepository;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaferServiceImpl implements WaferService {

    private final EqpInspectionHstAlphaRepository eqpInspectionHstAlphaRepository;

    public SummaryWaferDto getWaferSummaryList(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo) {

        List<EqpInspectionHstAlpha> list = eqpInspectionHstAlphaRepository.findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(
            lotId, lotSeq, flowRecipe, slotNo);

        return EqpInspectionHstAlphaConvertor.convert(list, flowRecipe);
    }
}
