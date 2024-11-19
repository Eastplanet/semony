package com.semony.maker.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ModuleRequestPayload {

    private final String moduleName;
    private final String date;
    private final String lotId;
    private final String flowRecipe;
    private final String lotSeq;
    private final String slotNo;
    private final String localFolderPath;
    private final String macroFolder;
    private final String selectedSubfolder;
}