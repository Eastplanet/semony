package com.semony.maker.application.processor;

import static com.semony.maker.global.constants.Constants.EBR;
import static com.semony.maker.global.constants.Constants.ERROR_INVALID_RECIPE_COMBINATION;
import static com.semony.maker.global.constants.Constants.ERROR_MODULE_REQUEST;
import static com.semony.maker.global.constants.Constants.EWIM_FOLDER_PATH;
import static com.semony.maker.global.constants.Constants.IN_FOLDER_PATH;
import static com.semony.maker.global.constants.Constants.MACRO_INSPECTION;
import static com.semony.maker.global.constants.Constants.OUT_FOLDER_PATH;
import static com.semony.maker.global.constants.Constants.SUBFOLDER_OPTIONS;
import static com.semony.maker.global.constants.Constants.SUCCESS_MODULE_REQUEST;

import com.semony.maker.application.handler.LogHandler;
import com.semony.maker.application.service.EqpInspectionHstAlphaService;
import com.semony.maker.application.service.LotService;
import com.semony.maker.application.service.ModuleRequestService;
import com.semony.maker.domain.dto.RecipeCombination;
import com.semony.maker.domain.provider.RecipeMappingProvider;
import com.semony.maker.global.error.ErrorCode;
import com.semony.maker.global.error.exception.BusinessException;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Component;

@Component
public class InspectionProcessor {


    private final RecipeMappingProvider recipeMappingProvider;
    private final ModuleRequestService moduleRequestService;
    private final LogHandler logHandler;
    private final LotService lotService;
    private final EqpInspectionHstAlphaService eqpInspectionHstAlphaService;

    public InspectionProcessor(RecipeMappingProvider recipeMappingProvider,
        ModuleRequestService moduleRequestService,
        LogHandler logHandler,
        LotService lotService, EqpInspectionHstAlphaService eqpInspectionHstAlphaService) {
        this.recipeMappingProvider = recipeMappingProvider;
        this.moduleRequestService = moduleRequestService;
        this.logHandler = logHandler;
        this.lotService = lotService;
        this.eqpInspectionHstAlphaService = eqpInspectionHstAlphaService;
    }

    @Transactional
    public void processInspection(String recipe, LocalDate requestTime, int slotId) {
        String lotId = lotService.generateLotId();
        long lotSeq = lotService.generateLotSeq();
        String selectRootSlot = randomSelectRootSlot();
        RecipeCombination combination = validateAndGetRecipeCombination(recipe, requestTime, lotId,
            lotSeq);
        if (!processModuleRequests(combination, recipe, requestTime, lotId, lotSeq, slotId,
            selectRootSlot)) {
            throw new BusinessException(recipe, "module", ErrorCode.NOT_FOUND_RECIPE);
        }
    }

    private RecipeCombination validateAndGetRecipeCombination(String recipe, LocalDate requestTime,
        String lotId, long lotSeq) {
        RecipeCombination combination = recipeMappingProvider.generateCombination(recipe);
        if (combination == null) {
            logHandler.logError(ERROR_INVALID_RECIPE_COMBINATION, recipe, "N/A",
                requestTime, lotId, lotSeq);
            throw new BusinessException(recipe, "recipe", ErrorCode.NOT_FOUND_RECIPE);
        }
        return combination;
    }

    private boolean processModuleRequests(RecipeCombination combination, String recipe,
        LocalDate requestTime,
        String lotId, long lotSeq, int slotId, String selectedModule) {

        return
            sendAndLogModuleRequest(combination.in() + " (IN)", recipe, requestTime, lotId, lotSeq,
                slotId,
                IN_FOLDER_PATH, MACRO_INSPECTION, selectedModule, "MACRO_ON") &&
                sendAndLogModuleRequest(combination.ewim(), recipe, requestTime, lotId, lotSeq,
                    slotId,
                    EWIM_FOLDER_PATH, EBR, selectedModule, "EBR") &&
                sendAndLogModuleRequest(combination.out() + " (OUT)", recipe, requestTime, lotId,
                    lotSeq, slotId,
                    OUT_FOLDER_PATH, MACRO_INSPECTION, selectedModule, "MACRO_ON");
    }

    private boolean sendAndLogModuleRequest(String moduleName, String recipe, LocalDate requestTime,
        String lotId, long lotSeq, int slotId, String localFolderPath,
        String macroFolder, String selectedModule, String processRecipe) {
        try {
            Map<String, Long> defectImpo = moduleRequestService.sendModuleRequest(moduleName,
                requestTime, lotId, recipe, lotSeq,
                slotId, localFolderPath, macroFolder, selectedModule);
            long defectCount = defectImpo.get("defectCount");
            long defectDieCount = defectImpo.get("defectDieCount");

            logHandler.logSuccess(SUCCESS_MODULE_REQUEST, recipe, moduleName,
                requestTime, lotId, lotSeq);
            eqpInspectionHstAlphaService.saveInspection(moduleName, recipe, requestTime, lotId,
                lotSeq, slotId, processRecipe, defectCount, defectDieCount);

            return true;
        } catch (Exception e) {
            logHandler.logError(ERROR_MODULE_REQUEST, recipe, moduleName, requestTime,
                lotId, lotSeq);
            return false;
        }
    }

    private String randomSelectRootSlot() {
        return SUBFOLDER_OPTIONS.get(new Random().nextInt(SUBFOLDER_OPTIONS.size()));
    }
}
