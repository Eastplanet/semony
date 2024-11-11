package com.semony.maker.application.service;

import com.semony.maker.domain.entity.EqpInspectionHstAlpha;
import com.semony.maker.domain.repository.EqpInspectionHstAlphaRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EqpInspectionHstAlphaServiceImpl implements EqpInspectionHstAlphaService {

    private final EqpInspectionHstAlphaRepository inspectionRepository;

    @Autowired
    public EqpInspectionHstAlphaServiceImpl(EqpInspectionHstAlphaRepository inspectionRepository) {
        this.inspectionRepository = inspectionRepository;
    }

    @Override
    public void saveInspection(String module, String recipe,
        LocalDate requestTime, String lotId, long lotSeq,
        int slotId, String processRecipe, long defectCount, long defectDieCount) {

        // 현재 시간 사용하여 createDtts 및 eventDtts 설정
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalTime currentTime = LocalTime.now(); // 현재 시간을 가져옴
        LocalDateTime eventDtts = LocalDateTime.of(requestTime, currentTime); // 동일한 방식으로 eventDtts 설정
        // EqpInspectionHstAlpha 객체 생성
        System.out.println("CT: " + currentTime);
        System.out.println("ET: " + eventDtts);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedTime = requestTime.format(formatter);
        String savaLotId = String.format("LP2%s_PJ2@%s", formattedTime, lotId);
        EqpInspectionHstAlpha inspection = EqpInspectionHstAlpha.builder()
            .eventDtts(eventDtts)
            .moduleId(module)
            .lotId(savaLotId)
            .lotSeq(BigDecimal.valueOf(lotSeq))
            .slotNo(String.valueOf(slotId))
            .flowRecipe(recipe)
            .processRecipe(processRecipe) // RecipeCombination에서 값을 가져옴
            .portNo(String.valueOf(slotId)) // RecipeCombination에서 값을 가져옴
            .defectCount(defectCount)
            .defectDieCount(defectDieCount)
            .createDtts(currentDateTime)
            .build();

        // inspection 객체를 저장하고 반환
        inspectionRepository.save(inspection);
    }
}
