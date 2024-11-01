package com.semony.integrated.application;

import com.semony.integrated.domain.dto.SummaryWaferDto;
import java.math.BigDecimal;

public interface WaferService {

    public SummaryWaferDto getWaferSummaryList(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo);
}
