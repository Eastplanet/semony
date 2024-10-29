package com.semony.maker.application.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface LoggingService {
    public void logError(String message, String recipe, String moduleName,
        LocalDateTime currentTime,
        LocalDate requestTime, String lotId, long lotSeq);
    public void logSuccess(String message, String recipe, String moduleName,
        LocalDateTime currentTime,
        LocalDate requestTime, String lotId, long lotSeq);
}
