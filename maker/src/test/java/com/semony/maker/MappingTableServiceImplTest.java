package com.semony.maker;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.semony.maker.application.service.MappingTableServiceImpl;
import com.semony.maker.domain.dto.RecipeCombination;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MappingTableServiceImplTest {

    private MappingTableServiceImpl mappingTableService;

    @BeforeEach
    void setUp() {
        mappingTableService = new MappingTableServiceImpl();
    }

    @Test
    void testGenerateCombination_ValidRecipe() {
        // 각 레시피에 대해 예상되는 조합이 제대로 반환되는지 확인
        RecipeCombination expectedCombination1 = new RecipeCombination("MIW-7-51", "MIW-7-61",
            "EWIM1-36");
        RecipeCombination result1 = mappingTableService.generateCombination("0TT_EWIM_NO_CHHP");
        assertEquals(expectedCombination1, result1);

        RecipeCombination expectedCombination2 = new RecipeCombination("MIW-7-52", "MIW-7-62",
            "EWIM1-46");
        RecipeCombination result2 = mappingTableService.generateCombination("1TT_EWIM_NO_CHHP");
        assertEquals(expectedCombination2, result2);

        RecipeCombination expectedCombination3 = new RecipeCombination("MIW-7-51", "MIW-7-61",
            "EWIM2-36");
        RecipeCombination result3 = mappingTableService.generateCombination("2TT_EWIM_NO_CHHP");
        assertEquals(expectedCombination3, result3);

        // 추가 레시피들에 대해서도 동일한 방식으로 테스트 추가 가능
    }

    @Test
    void testGenerateCombination_InvalidRecipe() {
        // 존재하지 않는 레시피에 대해 null이 반환되는지 확인
        RecipeCombination result = mappingTableService.generateCombination("invalid_recipe");
        assertNull(result);
    }
}