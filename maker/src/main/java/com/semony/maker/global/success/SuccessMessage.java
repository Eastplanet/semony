package com.semony.maker.global.success;

import lombok.Getter;

@Getter
public enum SuccessMessage {

    INSPECTION_DATA_CREATION_SUCCESS("Inspection data created successfully for recipe: %s");

    private final String message;

    SuccessMessage(String message) {
        this.message = message;
    }

    public String format(Object... args) {
        return String.format(message, args);
    }
}