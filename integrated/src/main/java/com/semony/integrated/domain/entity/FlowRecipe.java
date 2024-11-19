package com.semony.integrated.domain.entity;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum FlowRecipe {

    RECIPE_0("0TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM1-36"),
    RECIPE_1("1TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM1-46"),
    RECIPE_2("2TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM2-36"),
    RECIPE_3("3TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM2-46"),
    RECIPE_4("4TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM1-36"),
    RECIPE_5("5TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM1-46"),
    RECIPE_6("6TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM2-36"),
    RECIPE_7("7TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM2-46"),
    RECIPE_8("8TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM1-36"),
    RECIPE_9("9TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM1-46"),
    RECIPE_10("10TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM2-36"),
    RECIPE_11("11TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM2-46"),
    RECIPE_12("12TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM1-36"),
    RECIPE_13("13TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM1-46"),
    RECIPE_14("14TT_EWIM_NO_CHHP", "MIW7-51", "MIW7-61", "EWIM2-36"),
    RECIPE_15("15TT_EWIM_NO_CHHP", "MIW7-52", "MIW7-62", "EWIM2-46");

    private final String ppid;
    private final String in;
    private final String ewim;
    private final String out;

    private FlowRecipe(String ppid, String in, String out, String ewim) {
        this.ppid = ppid;
        this.in = in;
        this.out = out;
        this.ewim = ewim;
    }

    public static FlowRecipe findByPpid(String ppid) {
        return Arrays.stream(FlowRecipe.values())
            .filter(recipe -> recipe.getPpid().equals(ppid))
            .findFirst()
            .orElseThrow(
                () -> new IllegalArgumentException("No matching FlowRecipe for ppid: " + ppid));
    }
}