package com.semony.maker.application.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoggingServiceImpl implements LoggingService{

    private final MongoTemplate mongoTemplate;

    public LoggingServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void logError(String message, String recipe, String moduleName,
        LocalDateTime currentTime,
        LocalDate requestTime, String lotId, long lotSeq) {
        mongoTemplate.save(Map.of(
            "status", "error",
            "message", message,
            "recipe", recipe,
            "module", moduleName,
            "current_time", currentTime,
            "request_time", requestTime,
            "lot_id", lotId,
            "lot_seq", lotSeq
        ), "inspectionLogs");
    }

    public void logSuccess(String message, String recipe, String moduleName,
        LocalDateTime currentTime,
        LocalDate requestTime, String lotId, long lotSeq) {
        mongoTemplate.save(Map.of(
            "status", "success",
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