package com.semony.integrated.application.parser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.semony.integrated.domain.dto.json.ResultJson;
import java.io.File;
import java.io.IOException;

public class JsonParser {

    public ResultJson parse(String fileName) {
        // JSON 파일 경로
        String filePath = "src/main/resources/static/Result.json";

        // ObjectMapper를 사용해 JSON을 Java 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        // JavaTimeModule 등록
        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // ISO 8601 포맷으로 사용

        try {
            // JSON 파일을 읽고 ResultJson 클래스로 변환
            ResultJson resultJson = objectMapper.readValue(new File(filePath), ResultJson.class);

            System.out.println("JSON 파일이 성공적으로 파싱되었습니다!");
//            System.out.println(resultJson);

            return resultJson;
        } catch (IOException e) {
            System.err.println("JSON 파일을 읽는 중 오류가 발생했습니다: " + e.getMessage());
        }

        return null;
    }
}
