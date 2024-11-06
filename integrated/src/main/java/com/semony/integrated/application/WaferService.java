package com.semony.integrated.application;

import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.dto.WaferDetailDTO;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface WaferService {

    public SummaryWaferDto getWaferSummary(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo);

    public List<SummaryWaferDto> getWaferSummaryList(LocalDateTime startDate, LocalDateTime endDate);

    public WaferDetailDTO getWaferDetail(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo)
        throws IOException;
}
