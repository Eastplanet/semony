package com.semony.maker.application.service;

import java.time.LocalDate;
import java.util.Map;

public interface ModuleRequestService {

    Map<String, Long> sendModuleRequest(String moduleName, LocalDate date, String lotId,
        String flowRecipe,
        long lotSeq, int slotNo, String localFolderPath, String macroFolder, String selectModule);
}
