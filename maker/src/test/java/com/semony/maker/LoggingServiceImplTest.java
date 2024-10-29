package com.semony.maker;

import static org.mockito.Mockito.verify;

import com.semony.maker.application.service.LoggingServiceImpl;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.mongodb.core.MongoTemplate;

class LoggingServiceImplTest {

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private LoggingServiceImpl loggingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogError() {
        // Given
        String status = "error";
        String message = "Test error message";
        String recipe = "Test recipe";
        String moduleName = "TestModule";
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDate requestTime = LocalDate.now();
        String lotId = "LP22024100315_PJ2@89654577";
        long lotSeq = 123456;

        // When
        loggingService.saveLog(status, message, recipe, moduleName, currentTime, requestTime, lotId, lotSeq);

        // Then
        verify(mongoTemplate).save(Map.of(
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

    @Test
    void testLogSuccess() {
        // Given
        String status = "success";
        String message = "Test success message";
        String recipe = "Test recipe";
        String moduleName = "TestModule";
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDate requestTime = LocalDate.now();
        String lotId = "LP22024100315_PJ2@89654577";
        long lotSeq = 123456;

        // When
        loggingService.saveLog(status, message, recipe, moduleName, currentTime, requestTime, lotId, lotSeq);

        // Then
        verify(mongoTemplate).save(Map.of(
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
