package com.semony.integrated.application;

import com.semony.integrated.domain.dto.EqpInspectionHstAlphaConvertor;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.dto.WaferSpecificationValueDto;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import com.semony.integrated.domain.repository.EqpInspectionHstAlphaRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaferServiceImpl implements WaferService {

    private final EqpInspectionHstAlphaRepository repository;

    public SummaryWaferDto getWaferSummary(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo) {

        List<EqpInspectionHstAlpha> list = repository.findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(lotId, lotSeq, flowRecipe, slotNo);

        return EqpInspectionHstAlphaConvertor.convert(list, flowRecipe);
    }

    @Override
    public List<SummaryWaferDto> getWaferSummaryList(LocalDateTime startDate, LocalDateTime endDate) {

        List<WaferSpecificationValueDto> inspectionHistory = repository.findInspectionHistory(startDate, endDate);

        List<SummaryWaferDto> summaryWaferDtoList = new ArrayList<>();

        for (WaferSpecificationValueDto inspection : inspectionHistory) {
            SummaryWaferDto waferSummary = getWaferSummary(inspection.getLotId(), inspection.getLotSeq(), inspection.getFlowRecipe(), inspection.getSlotNo());
            summaryWaferDtoList.add(waferSummary);
        }

        return summaryWaferDtoList;
    }
}
