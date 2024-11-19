package com.semony.maker.application.handler;

import com.semony.maker.application.service.LoggingService;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class LogHandler {

    private final LoggingService loggingService;

    public LogHandler(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    public void logSuccess(String message, String recipe, String moduleName,
        LocalDateTime requestTime, String lotId, long lotSeq) {
        loggingService.saveLog("success", message, recipe, moduleName, LocalDateTime.now(),
            requestTime, lotId, lotSeq);
    }

    public void logError(String message, String recipe, String moduleName,
        LocalDateTime requestTime, String lotId, long lotSeq) {
        loggingService.saveLog("error", message, recipe, moduleName, LocalDateTime.now(),
            requestTime, lotId, lotSeq);
    }
}