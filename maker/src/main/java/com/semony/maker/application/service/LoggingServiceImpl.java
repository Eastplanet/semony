package com.semony.maker.application.service;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoggingServiceImpl implements LoggingService {

    private final MongoTemplate mongoTemplate;

    @Transactional
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