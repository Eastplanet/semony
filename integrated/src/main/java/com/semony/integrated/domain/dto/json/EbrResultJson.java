package com.semony.integrated.domain.dto.json;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EbrResultJson {

    @JsonProperty("$type")
    String type;

    @JsonProperty("m_ebrDividedDataList")
    CustomEbrDividedDataList mEbrDividedDataList;

    @JsonProperty("m_status")
    Integer mStatus;

    @JsonProperty("m_exceptionMessage")
    String mExceptionMessage;

    @JsonProperty("m_exceptionString")
    String mExceptionString;

    @JsonProperty("m_thumbnailImageFilePathList")
    ThumbnailImageFilePathList mThumbnailImageFilePathList;

    @JsonProperty("EbrResultType")
    Integer ebrResultType;

    @JsonProperty("NotchAngle")
    Position notchAngle;

    @JsonProperty("EbrAverageThickness")
    Position ebrAverageThickness;

    @JsonProperty("EbrDivideCount")
    Integer ebrDivideCount;

    @JsonProperty("WaferLoadingCenterOffsetX")
    Position waferLoadingCenterOffsetX;

    @JsonProperty("WaferLoadingCenterOffsetY")
    Position waferLoadingCenterOffsetY;

    @JsonProperty("ChuckFlatnessAngle")
    Position chuckFlatnessAngle;

    @JsonProperty("AfterAlignCenterOffsetX")
    Position afterAlignCenterOffsetX;

    @JsonProperty("AfterAlignCenterOffsetY")
    Position afterAlignCenterOffsetY;

    @JsonProperty("AfterAlignWaferRadius")
    Position afterAlignWaferRadius;

    @JsonProperty("FitEllipseAxisLong")
    Position fitEllipseAxisLong;

    @JsonProperty("FitEllipseAxisShort")
    Position fitEllipseAxisShort;

    @JsonProperty("FitEllipseAngle")
    Position fitEllipseAngle;

    @JsonProperty("ResultImageFilePath")
    String resultImageFilePath;

    @JsonProperty("WaferUid")
    String waferUid;

    @JsonProperty("ErrorCode")
    Integer errorCode;

    @JsonProperty("FinishTime")
    OffsetDateTime finishTime;

    @JsonProperty("Uid")
    String uid;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class ZEbrDividedData {

    @JsonProperty("$type")
    String type;

    @JsonProperty("Index")
    Integer index;

    @JsonProperty("Angle")
    Position angle;

    @JsonProperty("MeasuredEbrWidth")
    Position measuredEbrWidth;

    @JsonProperty("BevelWidth")
    Position bevelWidth;

    @JsonProperty("RemvW")
    BigDecimal remvW;

    @JsonProperty("FittedEbrWidth")
    Position fittedEbrWidth;

    @JsonProperty("RemvW_Measure")
    BigDecimal remvWMeasure;

    @JsonProperty("wfEdgePos")
    BigDecimal wfEdgePos;

    @JsonProperty("BevelPos")
    BigDecimal bevelPos;

    @JsonProperty("RemvPos")
    BigDecimal remvPos;

    @JsonProperty("wfEdgePosMeasure")
    BigDecimal wfEdgePosMeasure;

    @JsonProperty("RemvPosMeasure")
    BigDecimal remvPosMeasure;

    @JsonProperty("EBRCurAngleIdx")
    Integer ebrCurAngleIdx;

    @JsonProperty("wfEdgePos_Rel")
    BigDecimal wfEdgePosRel;

    @JsonProperty("BevelPos_Rel")
    BigDecimal bevelPosRel;

    @JsonProperty("RemvPos_Rel")
    BigDecimal remvPosRel;

    @JsonProperty("X")
    Integer x;

    @JsonProperty("Y")
    Integer y;

    @JsonProperty("Width")
    Integer width;

    @JsonProperty("Height")
    Integer height;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class CustomEbrDividedDataList {

    @JsonProperty("$type")
    String type;

    @JsonProperty("$values")
    List<ZEbrDividedData> values;
}