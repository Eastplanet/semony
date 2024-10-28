package com.semony.maker.global.error;

import com.semony.maker.global.error.exception.BusinessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BasicExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<String> handleBusinessException(final BusinessException e) {
        return ResponseEntity.status(e.getHttpStatus())
            .body(e.getMessage() + " " + e.getFieldName() + " : " + e.getInvalidValue());
    }
}
