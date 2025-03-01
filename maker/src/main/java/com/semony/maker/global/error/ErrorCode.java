package com.semony.maker.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    NOT_FOUND_RECIPE("레시피를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    MODULE_REQUEST_FAILED("모듈 요청에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    MODULE_IP_NOT_FOUND("유효하지 않은 모듈 이름입니다.", HttpStatus.BAD_REQUEST);  // 새로운 예외 상수 추가

    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
