package com.semony.maker.application.service;

import java.time.LocalDateTime;
import java.util.Map;

public interface ModuleRequestService {

    Map<String, Long> sendModuleRequest(String moduleName, LocalDateTime date, String lotId,
        String flowRecipe,
        long lotSeq, int slotNo, String localFolderPath, String macroFolder, String selectModule);
}
