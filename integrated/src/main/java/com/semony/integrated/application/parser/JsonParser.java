package com.semony.integrated.application.parser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.semony.integrated.domain.dto.json.EbrResultJson;
import com.semony.integrated.domain.dto.json.ResultJson;
import java.io.File;
import java.io.IOException;

public class JsonParser {

    public EbrResultJson parse(String filePath) {

        // ObjectMapper를 사용해 JSON을 Java 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        // JavaTimeModule 등록
        objectMapper.registerModule(new JavaTimeModule());

        try {
            return objectMapper.readValue(new File(filePath), EbrResultJson.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
