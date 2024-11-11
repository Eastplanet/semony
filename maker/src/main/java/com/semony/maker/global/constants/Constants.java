package com.semony.maker.global.constants;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;

public class Constants {

    @Value("#{${module_ips}}") // This will load the module_ips from the YAML
    private Map<String, String> moduleIps;

    public static final String MODULE_DATA_URI = "/modules/data";
    public static final String IN_FOLDER_PATH = "/var/lib/result/root/in";
    public static final String EWIM_FOLDER_PATH = "/var/lib/result/root/ewim";
    public static final String OUT_FOLDER_PATH = "/var/lib/result/root/out";
    public static final String MACRO_INSPECTION = "Macro[Inspection]";
    public static final String EBR = "EBR";
    public static final String ERROR_INVALID_RECIPE_COMBINATION = "Invalid recipe combination";
    public static final String SUCCESS_MODULE_REQUEST = "Module request success";
    public static final String ERROR_MODULE_REQUEST = "Module request failed";
    public static final List<String> SUBFOLDER_OPTIONS = List.of("006", "010", "018", "022");
    public static final int MAX_SLOT_COUNT = 25;

    public static final String TIMESTAMP_PATTERN = "yyMMddHH";
}
