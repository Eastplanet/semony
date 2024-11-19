package com.semony.maker.application.service;

import java.time.LocalDateTime;

public interface EqpInspectionHstAlphaService {

    void saveInspection(String module, String recipe,
        LocalDateTime requestTime, String lotId, long lotSeq,
        int slotId, String processRecipe, long defectCount, long defectDieCount);
}
