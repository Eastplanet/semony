package com.semony.integrated.domain.dto;

import java.math.BigDecimal;
import lombok.Getter;

@Getter
public class WaferSpecificationValueDto {
    private String lotId;
    private BigDecimal lotSeq;
    private String flowRecipe;
    private String slotNo;

    // 생성자
    public WaferSpecificationValueDto(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo) {
        this.lotId = lotId;
        this.lotSeq = lotSeq;
        this.flowRecipe = flowRecipe;
        this.slotNo = slotNo;
    }
}

