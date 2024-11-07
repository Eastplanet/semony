package com.semony.maker.application.service;

import java.time.LocalDate;

public interface EqpInspectionHstAlphaService {

    void saveInspection(String module, String recipe,
        LocalDate requestTime, String lotId, long lotSeq,
        int slotId, String processRecipe, long defectCount, long defectDieCount);
}
