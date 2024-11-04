package com.semony.maker.presentation;

import static com.semony.maker.global.success.SuccessMessage.INSPECTION_DATA_CREATION_SUCCESS;

import com.semony.maker.application.service.LoggingService;
import com.semony.maker.application.service.LotService;
import com.semony.maker.application.service.ModuleRequestService;
import com.semony.maker.domain.dto.RecipeCombination;
import com.semony.maker.domain.provider.RecipeMappingProvider;
import com.semony.maker.global.error.ErrorCode;
import com.semony.maker.global.error.LogMessage;
import com.semony.maker.global.error.exception.BusinessException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MakerController {

    private final RecipeMappingProvider recipeMappingProvider;
    private final ModuleRequestService moduleRequestService;
    private final LoggingService loggingService;
    private final LotService lotService;

    @Autowired
    public MakerController(RecipeMappingProvider recipeMappingProvider,
        ModuleRequestService moduleRequestService,
        LoggingService loggingService, LotService lotService) {
        this.recipeMappingProvider = recipeMappingProvider;
        this.moduleRequestService = moduleRequestService;
        this.loggingService = loggingService;
        this.lotService = lotService;
    }

    @PostMapping("/make")
    public ResponseEntity<?> makeInspectionData(@RequestParam String recipe,
        @RequestParam LocalDate requestTime) {
        String lotId = lotService.generateLotId();
        long lotSeq = lotService.generateLotSeq();

        RecipeCombination combination = validateAndGetRecipeCombination(recipe, requestTime, lotId, lotSeq);
        if (combination == null) {
            throw new BusinessException(recipe, "recipe", ErrorCode.NOT_FOUND_RECIPE);
        }

        if (!processModuleRequests(combination, recipe, requestTime, lotId, lotSeq)) {
            throw new BusinessException(recipe, "module", ErrorCode.NOT_FOUND_RECIPE);
        }

        return ResponseEntity.ok(INSPECTION_DATA_CREATION_SUCCESS + recipe);
    }

    private RecipeCombination validateAndGetRecipeCombination(String recipe, LocalDate requestTime,
        String lotId, long lotSeq) {
        RecipeCombination combination = recipeMappingProvider.generateCombination(recipe);
        if (combination == null) {
            loggingService.saveLog("error", LogMessage.INVALID_RECIPE.getMessage(), recipe,
                "N/A", LocalDateTime.now(), requestTime, lotId, lotSeq);
        }
        return combination;
    }

    private boolean processModuleRequests(RecipeCombination combination, String recipe,
        LocalDate requestTime, String lotId, long lotSeq, int slotId) {
        String selectModule = randomSelectModule();
        return
            sendAndLogModuleRequest(combination.in() + " (IN)", recipe, requestTime, lotId, lotSeq, slotId,
                "C:/root/in", "Macro[Inspection]", selectModule)
                && sendAndLogModuleRequest(combination.ewim(), recipe, requestTime, lotId, lotSeq,
                slotId, "C:/root/ewim", "Macro[Inspection]", selectModule)
                && sendAndLogModuleRequest(combination.ewim(), recipe, requestTime, lotId, lotSeq,
                slotId, "C:/root/ewim", "EBR", selectModule)
                && sendAndLogModuleRequest(combination.out() + " (OUT)", recipe, requestTime, lotId, lotSeq,
                slotId, "C:/root/out", "Macro[Inspection]", selectModule);
    }

    private boolean sendAndLogModuleRequest(String moduleName, String recipe, LocalDate requestTime,
        String lotId, long lotSeq) {
        try {
            moduleRequestService.sendModuleRequest(moduleName, requestTime);
            loggingService.saveLog("success", LogMessage.MODULE_REQUEST_SUCCESS.getMessage(),
                recipe, moduleName, LocalDateTime.now(), requestTime, lotId, lotSeq);
            return true;
        } catch (Exception e) {
            loggingService.saveLog("error", LogMessage.MODULE_REQUEST_FAILED.getMessage(), recipe,
                moduleName, LocalDateTime.now(), requestTime, lotId, lotSeq);
            return false;
        }
    }
}
