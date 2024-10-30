package com.semony.maker.domain.dto;

public record RecipeCombination(String in, String out, String ewim) {

    @Override
    public String toString() {
        return String.format("IN: %s, OUT: %s, EWIM: %s", in, out, ewim);
    }
}
