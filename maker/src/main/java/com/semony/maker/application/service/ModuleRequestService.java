package com.semony.maker.application.service;

import java.time.LocalDate;

public interface ModuleRequestService {

    public void sendModuleRequest(String moduleName, LocalDate date, String lotId,
        String flowRecipe,
        long lotSeq, int slotNo, String localFolderPath, String macroFolder, String selectModule);
}
