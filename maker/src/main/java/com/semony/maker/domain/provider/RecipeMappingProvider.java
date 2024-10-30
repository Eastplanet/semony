package com.semony.maker.domain.provider;

import com.semony.maker.domain.dto.RecipeCombination;
import java.util.HashMap;
import java.util.Map;

public class RecipeMappingProvider {

    private final Map<String, RecipeCombination> recipeMap;

    public RecipeMappingProvider() {
        recipeMap = new HashMap<>();

        // 16가지 고정된 조합을 미리 매핑
        recipeMap.put("0TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM1-36"));
        recipeMap.put("1TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM1-46"));
        recipeMap.put("2TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM2-36"));
        recipeMap.put("3TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM2-46"));
        recipeMap.put("4TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM1-36"));
        recipeMap.put("5TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM1-46"));
        recipeMap.put("6TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM2-36"));
        recipeMap.put("7TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM2-46"));
        recipeMap.put("8TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM1-36"));
        recipeMap.put("9TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM1-46"));
        recipeMap.put("10TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM2-36"));
        recipeMap.put("11TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM2-46"));
        recipeMap.put("12TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM1-36"));
        recipeMap.put("13TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM1-46"));
        recipeMap.put("14TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-51", "MIW-7-61", "EWIM2-36"));
        recipeMap.put("15TT_EWIM_NO_CHHP",
            new RecipeCombination("MIW-7-52", "MIW-7-62", "EWIM2-46"));
    }

    public RecipeCombination generateCombination(String recipe) {
        return recipeMap.get(recipe);
    }
}