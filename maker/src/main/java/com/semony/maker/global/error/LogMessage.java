package com.semony.maker.global.error;

import lombok.Getter;

@Getter
public enum LogMessage {
    INVALID_RECIPE("Invalid recipe"),
    MODULE_REQUEST_FAILED("Module request failed"),
    MODULE_REQUEST_SUCCESS("Module request successful"),
    INSPECTION_DATA_CREATION_SUCCESS("Inspection data creation successful");

    private final String message;

    LogMessage(String message) {
        this.message = message;
    }
}
