package com.semony.maker.global.constants;

import java.util.List;
import java.util.Map;

public class Constants {

    public static final Map<String, String> MODULE_IPS = Map.of(
        "MIW7-51", "http://localhost:8000",
        "MIW7-52", "http://localhost:8000",
        "MIW7-61", "http://localhost:8002",
        "MIW7-62", "http://localhost:8000",
        "EWIM1-36", "http://localhost:8001",
        "EWIM1-46", "http://localhost:8000",
        "EWIM2-36", "http://localhost:8000",
        "EWIM2-46", "http://localhost:8000"
    );

    public static final String MODULE_DATA_URI = "/modules/data";
    public static final String IN_FOLDER_PATH = "C:/root/in";
    public static final String EWIM_FOLDER_PATH = "C:/root/ewim";
    public static final String OUT_FOLDER_PATH = "C:/root/out";
    public static final String MACRO_INSPECTION = "Macro[Inspection]";
    public static final String EBR = "EBR";
    public static final String ERROR_INVALID_RECIPE_COMBINATION = "Invalid recipe combination";
    public static final String SUCCESS_MODULE_REQUEST = "Module request success";
    public static final String ERROR_MODULE_REQUEST = "Module request failed";
    public static final List<String> SUBFOLDER_OPTIONS = List.of("006", "010", "018", "022");

    public static final String TIMESTAMP_PATTERN = "yyMMddHH";
}
