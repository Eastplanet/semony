package com.semony.maker.application.service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
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
        LocalDateTime currentTime, LocalDateTime requestTime, String lotId, long lotSeq) {

        // 수정 가능한 HashMap을 사용하여 로그 데이터를 저장
        Map<String, Object> logData = new HashMap<>();
        logData.put("status", status);
        logData.put("message", message);
        logData.put("recipe", recipe);
        logData.put("module", moduleName);
        logData.put("current_time", currentTime);
        logData.put("request_time", requestTime);
        logData.put("lot_id", lotId);
        logData.put("lot_seq", lotSeq);

        // MongoDB에 데이터 저장
        mongoTemplate.save(logData, "inspectionLogs");
    }
}