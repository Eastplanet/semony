package com.semony.integrated.domain.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SummaryWaferDto {

    private String ppid;
    private String lotId;
    private BigDecimal lotSeq;
    private Integer slotNo;
    private Long totalDefectCount;
    private Module[] modules;

    @Data
    public static class Module {

        private String moduleId;
        private Long defect;
        private LocalDateTime eventDtts;
    }
}
