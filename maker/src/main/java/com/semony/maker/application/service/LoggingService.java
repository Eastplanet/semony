package com.semony.maker.application.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface LoggingService {

    public void saveLog(String status, String message, String recipe, String moduleName,
        LocalDateTime currentTime, LocalDate requestTime, String lotId, long lotSeq);
}
