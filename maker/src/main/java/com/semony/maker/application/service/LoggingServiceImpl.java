package com.semony.maker.application.service;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoggingServiceImpl implements LoggingService {

    private final MongoTemplate mongoTemplate;

    public LoggingServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public void logError(String message, String recipe, String moduleName,
        LocalDateTime currentTime, LocalDate requestTime, String lotId, long lotSeq) {
        saveLog("error", message, recipe, moduleName, currentTime, requestTime, lotId, lotSeq);
    }

    @Transactional
    public void logSuccess(String message, String recipe, String moduleName,
        LocalDateTime currentTime, LocalDate requestTime, String lotId, long lotSeq) {
        saveLog("success", message, recipe, moduleName, currentTime, requestTime, lotId, lotSeq);
    }

    public void saveLog(String status, String message, String recipe, String moduleName,
        LocalDateTime currentTime, LocalDate requestTime, String lotId, long lotSeq) {
        mongoTemplate.save(Map.of(
            "status", status,
            "message", message,
            "recipe", recipe,
            "module", moduleName,
            "current_time", currentTime,
            "request_time", requestTime,
            "lot_id", lotId,
            "lot_seq", lotSeq
        ), "inspectionLogs");
    }
}