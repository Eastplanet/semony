package com.semony.integrated.domain.dto.smf;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class
WaferInspectionDTO {

    private String moduleId;
    private LocalDateTime eventDtts;
    private String fileVersion;
    private String fileTimestamp;
    private List<String> inspectionStationID;
    private String sampleType;
    private String resultTimestamp;
    private String lotID;
    private List<Integer> sampleSize;
    private List<String> setupID;
    private String stepID;
    private int coatorID;
    private String spinName;
    private String sampleOrientationMarkType;
    private String orientationMarkLocation;
    private List<Double> diePitch;
    private List<Integer> shotComposition;
    private List<Double> dieOrigin;
    private String waferID;
    private int slot;
    private List<Double> sampleCenterLocation;
    private int inspectionTest;
    private int sampleTestPlan;
    private List<DieLocation> dieLocations;
    private List<DefectRecord> defectRecordSpec;
    private SummarySpec summarySpec;
    private Integer defectCnt;
    private Integer defectDieCnt;

    @Data
    public static class DieLocation {

        private int xIndex;
        private int yIndex;
    }

    @Data
    @Builder
    public static class DefectRecord {

        private int defectID;
        private double xRel;
        private double yRel;
        private int xIndex;
        private int yIndex;
        private int xSize;
        private int ySize;
        private int defectArea;
        private double gdsX;
        private double gdsY;
        private double grayMin;
        private double grayMax;
        private double grayMean;
        private int alg;
        private double radius;
        private int select;
    }

    @Data
    @Builder
    public static class SummarySpec {

        private int testNo;
        private int nDefect;
        private double defDensity;
        private int nDie;
        private int nDefDie;
    }
}
