package com.semony.integrated.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.semony.integrated.domain.dto.convertor.EqpInspectionHstAlphaConvertor;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import com.semony.integrated.domain.repository.EqpInspectionHstAlphaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

//@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class WaferServiceImplTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private WaferServiceImpl waferService;


//    @Mock
    @Autowired
    private EqpInspectionHstAlphaRepository eqpInspectionHstAlphaRepository;

    @Test
    public void testEntityManagerInitialization() {
        assertNotNull(entityManager, "EntityManager should be initialized and not null");
    }

    @Test
    @DisplayName("waferSummaryList 조회 기능 성공 테스트")
    void waferSummaryList조회기능성공테스트() {

        // Given
        String lotId = "LP22024100315_PJ2@89654577";
        BigDecimal lotSeq = new BigDecimal("727939436");
        String flowRecipe = "0TT_EWIM_NO_CHHP";
        String slotNo = "22";

        EqpInspectionHstAlpha mockEntity1 = EqpInspectionHstAlpha.builder()
            .eventDtts(LocalDateTime.parse("2024-10-03T16:13:55.006"))
            .moduleId("MIW7-51")
            .lotId("LP22024100315_PJ2@89654577")
            .lotSeq(new BigDecimal("727939436"))
            .slotNo("22")
            .flowRecipe("0TT_EWIM_NO_CHHP")
            .processRecipe("MACRO_ON")
            .portNo("2")
            .defectCount(0L)
            .createDtts(LocalDateTime.parse("2024-10-03T16:12:10.635"))
            .build();

        EqpInspectionHstAlpha mockEntity2 = EqpInspectionHstAlpha.builder()
            .eventDtts(LocalDateTime.parse("2024-10-03T16:21:08.662"))
            .moduleId("EWIM1-36")
            .lotId("LP22024100315_PJ2@89654577")
            .lotSeq(new BigDecimal("727939436"))
            .slotNo("22")
            .flowRecipe("0TT_EWIM_NO_CHHP")
            .processRecipe("EBR")
            .portNo("2")
            .defectCount(0L)
            .createDtts(LocalDateTime.parse("2024-10-03T16:19:24.291"))
            .build();

        EqpInspectionHstAlpha mockEntity3 = EqpInspectionHstAlpha.builder()
            .eventDtts(LocalDateTime.parse("2024-10-03T16:35:29.487"))
            .moduleId("MIW7-61")
            .lotId("LP22024100315_PJ2@89654577")
            .lotSeq(new BigDecimal("727939436"))
            .slotNo("22")
            .flowRecipe("0TT_EWIM_NO_CHHP")
            .processRecipe("MACRO_ON")
            .portNo("2")
            .defectCount(0L)
            .createDtts(LocalDateTime.parse("2024-10-03T16:33:45.116"))
            .build();

        // 생성된 mockEntity 3개를 리스트에 포함
        List<EqpInspectionHstAlpha> mockList = Arrays.asList(mockEntity1, mockEntity2, mockEntity3);

        eqpInspectionHstAlphaRepository.saveAll(mockList);


        SummaryWaferDto expected = EqpInspectionHstAlphaConvertor.convert(mockList, flowRecipe);
        // When

        SummaryWaferDto result = waferService.getWaferSummary(lotId, lotSeq, flowRecipe,
            slotNo);

        // Then
        assertNotNull(result);

        // 각 속성을 비교하여 동일한지 확인
        assertEquals(expected.getPpid(), result.getPpid(), "PPID should match");
        assertEquals(expected.getLotId(), result.getLotId(), "Lot ID should match");
        assertEquals(expected.getLotSeq(), result.getLotSeq(), "Lot sequence should match");
        assertEquals(expected.getSlotNo(), result.getSlotNo(), "Slot number should match");
        assertEquals(expected.getTotalDefectCount(), result.getTotalDefectCount(),
            "Total defect count should match");

        // StepInfo 비교
        for (int i = 0; i < 3; i++) {
            assertEquals(expected.getModules()[i].getModuleId(),
                result.getModules()[i].getModuleId(),
                "moduleId should match");
            assertEquals(expected.getModules()[i].getEventDtts(),
                result.getModules()[i].getEventDtts(),
                "event-time should match");
            assertEquals(expected.getModules()[i].getDefect(), result.getModules()[i].getDefect(),
                "defect count should match");
        }

    }

    @Test
    public void testGetWaferSummaryListWithData() {
        System.out.println("EntityManager: " + entityManager);

        // 테스트용 임시 데이터 삽입
        EqpInspectionHstAlpha data1 = EqpInspectionHstAlpha.builder()
            .eventDtts(LocalDateTime.of(2024, 10, 3, 16, 11, 1))
            .moduleId("MIW7-51")
            .lotId("1")
            .lotSeq(BigDecimal.valueOf(1))
            .flowRecipe("0TT_EWIM_NO_CHHP")
            .slotNo("1")
            .processRecipe("1")
            .portNo("1")
            .defectCount(1L)
            .createDtts(LocalDateTime.of(2024, 10, 3, 16, 11, 1))
            .build();

        EqpInspectionHstAlpha data2 = EqpInspectionHstAlpha.builder()
            .eventDtts(LocalDateTime.of(2024, 10, 3, 16, 11, 20))
            .moduleId("MIW7-61")
            .lotId("1")
            .lotSeq(BigDecimal.valueOf(1))
            .flowRecipe("0TT_EWIM_NO_CHHP")
            .slotNo("1")
            .processRecipe("1")
            .portNo("1")
            .defectCount(1L)
            .createDtts(LocalDateTime.of(2024, 10, 3, 16, 11, 1))
            .build();

        System.out.println("save");
        EqpInspectionHstAlpha save = eqpInspectionHstAlphaRepository.save(data1);
        EqpInspectionHstAlpha save1 = eqpInspectionHstAlphaRepository.save(data2);
        System.out.println(save);

        entityManager.flush(); // 영속성 컨텍스트에 반영
        entityManager.clear();

        // 테스트 입력 값
        LocalDateTime startDate = LocalDateTime.of(2024, 10, 3, 16, 11, 1);
        LocalDateTime endDate = LocalDateTime.of(2024, 10, 3, 16, 11, 36);

        List<EqpInspectionHstAlpha> all = eqpInspectionHstAlphaRepository.findAll();
        assertEquals(2, all.size());

        // 검증 1
        List<SummaryWaferDto> result = waferService.getWaferSummaryList(startDate, endDate);
        assertEquals(1, result.size()); // 결과 크기 검증

        // 검증 2
        endDate = LocalDateTime.of(2024, 10, 3, 16, 11, 20);
        result = waferService.getWaferSummaryList(startDate, endDate);
        assertEquals(1, result.size());

        // 검증 3
        endDate = LocalDateTime.of(2024, 10, 3, 16, 11, 1);
        result = waferService.getWaferSummaryList(startDate, endDate);
        assertEquals(1, result.size());

        // 검증 4
        endDate = LocalDateTime.of(2024, 10, 3, 16, 11, 0);
        result = waferService.getWaferSummaryList(startDate, endDate);
        assertEquals(0, result.size());
    }


}