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
import java.util.List;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(MakerController.class);

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
        @RequestParam LocalDate requestTime, @RequestParam int slotId) {
        String lotId = lotService.generateLotId();
        long lotSeq = lotService.generateLotSeq();

        RecipeCombination combination = validateAndGetRecipeCombination(recipe, requestTime, lotId,
            lotSeq);
        System.out.println(String.valueOf(combination));
        if (combination == null) {
            throw new BusinessException(recipe, "recipe", ErrorCode.NOT_FOUND_RECIPE);
        }

        if (!processModuleRequests(combination, recipe, requestTime, lotId, lotSeq, slotId)) {
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
        String lotId, long lotSeq, int slotId, String localFolderPath, String macroFolder, String selectModule) {
        try {
            // moduleRequestService에 필요한 모든 매개변수를 전달
            moduleRequestService.sendModuleRequest(
                moduleName,
                requestTime,
                lotId,
                recipe,
                lotSeq,
                slotId,
                localFolderPath,
                macroFolder,
                selectModule
            );

            // 성공 로그 저장
            loggingService.saveLog(
                "success",
                LogMessage.MODULE_REQUEST_SUCCESS.getMessage(),
                recipe,
                moduleName,
                LocalDateTime.now(),
                requestTime,
                lotId,
                lotSeq
            );
            return true;
        } catch (Exception e) {
            // 실패 로그 저장
            loggingService.saveLog(
                "error",
                LogMessage.MODULE_REQUEST_FAILED.getMessage(),
                recipe,
                moduleName,
                LocalDateTime.now(),
                requestTime,
                lotId,
                lotSeq
            );
            return false;
        }
    }
    public String randomSelectModule(){
        // 하위 폴더 랜덤 선택
        List<String> subfolderOptions = List.of("006", "010", "018", "022");
        return subfolderOptions.get(
            new Random().nextInt(subfolderOptions.size()));
    }
}
