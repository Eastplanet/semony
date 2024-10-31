package com.semony.maker.presentation;

import com.semony.maker.application.service.LotService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MakerController {

    private final MappingTableService mappingTableService;
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
        // lotID와 lotSeq 조회
        String lotId = lotService.generateLotId();
        long lotSeq = lotService.generateLotSeq();

        // RecipeCombination 가져오기 및 유효성 검사
        RecipeCombination combination = mappingTableService.generateCombination(recipe);
        if (combination == null) {
            loggingService.logError("Invalid recipe", recipe, "N/A", LocalDateTime.now(),
                requestTime, lotId, lotSeq);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid recipe: " + recipe);
        }

        // 각 모듈에 요청 보내기 및 로그 처리
        try {
            logModuleStatus(combination.in(), recipe, requestTime, lotId, lotSeq);
            logModuleStatus(combination.out(), recipe, requestTime, lotId, lotSeq);
            logModuleStatus(combination.ewim(), recipe, requestTime, lotId, lotSeq);
        } catch (Exception e) {
            loggingService.logError("Module request failed", recipe, "N/A", LocalDateTime.now(),
                requestTime, lotId, lotSeq);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Module request failed");
        }

        loggingService.logSuccess("Inspection data creation successful", recipe, "ALL_MODULES",
            LocalDateTime.now(), requestTime, lotId, lotSeq);
        return ResponseEntity.ok("Inspection data created successfully for recipe: " + recipe);
    }

    private void logModuleStatus(String moduleName, String recipe, LocalDate requestTime,
        String lotId, long lotSeq) {
        try {
            moduleRequestService.sendModuleRequest(moduleName, requestTime);
            loggingService.logSuccess("Module request successful", recipe, moduleName,
                LocalDateTime.now(), requestTime, lotId, lotSeq);
        } catch (Exception e) {
            loggingService.logError("Module request failed: " + e.getMessage(), recipe, moduleName,
                LocalDateTime.now(), requestTime, lotId, lotSeq);
        }
    }
}
