package com.semony.maker.application.handler;

import com.semony.maker.application.service.LoggingService;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class LogHandler {

    private final LoggingService loggingService;

    public LogHandler(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    public void logSuccess(String status, String message, String recipe, String moduleName,
        LocalDate requestTime, String lotId, long lotSeq) {
        loggingService.saveLog(status, message, recipe, moduleName, LocalDateTime.now(), requestTime, lotId, lotSeq);
    }

    public void logError(String status, String message, String recipe, String moduleName,
        LocalDate requestTime, String lotId, long lotSeq) {
        loggingService.saveLog(status, message, recipe, moduleName, LocalDateTime.now(), requestTime, lotId, lotSeq);
    }
}