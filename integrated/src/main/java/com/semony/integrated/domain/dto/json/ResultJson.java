package com.semony.integrated.domain.dto.json;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultJson {

    @JsonProperty("$type")
    String type;

    @JsonProperty("m_dieList")
    mDieList mDieList;

    @JsonProperty("m_defectList")
    mDefectList mDefectList;

    @JsonProperty("m_status")
    Integer mStatus;

    @JsonProperty("m_exceptionMessage")
    String mExceptionMessage;

    @JsonProperty("m_exceptionString")
    String mExceptionString;

    @JsonProperty("m_thumbnailImageFilePathList")
    ThumbnailImageFilePathList mThumbnailImageFilePathList;

    @JsonProperty("IsMacroGoldenWafer")
    boolean isMacroGoldenWafer;

    @JsonProperty("IsMacroAlign")
    boolean isMacroAlign;

    @JsonProperty("ScanCurrentCount")
    Integer scanCurrentCount;

    @JsonProperty("ScanTotalCount")
    Integer scanTotalCount;

    @JsonProperty("JudgeType")
    Integer judgeType;

    @JsonProperty("TotalDefectCount")
    Integer totalDefectCount;

    @JsonProperty("TotalDefectDieCount")
    Integer totalDefectDieCount;

    @JsonProperty("TotalDefectAreaPixel")
    BigDecimal totalDefectAreaPixel;

    @JsonProperty("TotalFilteredDefectCount")
    Integer totalFilteredDefectCount;

    @JsonProperty("TotalFilteredDefectDieCount")
    Integer totalFilteredDefectDieCount;

    @JsonProperty("TotalFilteredDefectAreaPixel")
    BigDecimal totalFilteredDefectAreaPixel;

    @JsonProperty("NotchAngle")
    Position notchAngle;

    @JsonProperty("PixelResolutionX")
    Position pixelResolutionX;

    @JsonProperty("PixelResolutionY")
    Position pixelResolutionY;

    @JsonProperty("PixelWaferCenterX")
    Position pixelWaferCenterX;

    @JsonProperty("PixelWaferCenterY")
    Position pixelWaferCenterY;

    @JsonProperty("PixelWaferWidth")
    BigDecimal pixelWaferWidth;

    @JsonProperty("PixelWaferHeight")
    BigDecimal pixelWaferHeight;

    @JsonProperty("AlignResultType")
    Integer alignResultType;

    @JsonProperty("DieWidth")
    Position dieWidth;

    @JsonProperty("DieHeight")
    Position dieHeight;

    @JsonProperty("DieOriginX")
    Position dieOriginX;

    @JsonProperty("DieOriginY")
    Position dieOriginY;

    @JsonProperty("WaferEdgeClearance")
    Position waferEdgeClearance;

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
class ThumbnailImageFilePathList {

    @JsonProperty("$type")
    String type;

    @JsonProperty("$values")
    List<String> values;
}


@Data
class mDefectList {

    @JsonProperty("$type")
    String type;

    @JsonProperty("$values")
    List<Defect> values;
}

@Data
class Defect {

    @JsonProperty("$type")
    String type;

    @JsonProperty("Id")
    Integer id;

    @JsonProperty("DieIndexX")
    Integer dieIndexX;

    @JsonProperty("DieIndexY")
    Integer dieIndexY;

    @JsonProperty("PositionXFromShotOrigin")
    Position positionXFromShotOrigin;

    @JsonProperty("PositionYFromShotOrigin")
    Position positionYFromShotOrigin;

    @JsonProperty("PixelSizeX")
    BigDecimal pixelSizeX;

    @JsonProperty("PixelSizeY")
    BigDecimal pixelSizeY;

    @JsonProperty("PixelArea")
    BigDecimal pixelArea;

    @JsonProperty("PixelCenterX")
    BigDecimal pixelCenterX;

    @JsonProperty("PixelCenterY")
    BigDecimal pixelCenterY;

    @JsonProperty("GrayLevelMin")
    BigDecimal grayLevelMin;

    @JsonProperty("GrayLevelMax")
    BigDecimal grayLevelMax;

    @JsonProperty("GrayLevelMean")
    BigDecimal grayLevelMean;

    @JsonProperty("IsDetectedByW2w")
    boolean isDetectedByW2W;

    @JsonProperty("IsDetectedByD2d")
    boolean isDetectedByD2D;

    @JsonProperty("RadiusFromCenter")
    Position radiusFromCenter;

    @JsonProperty("IsFiltering")
    boolean isFiltering;

    @JsonProperty("DefectImageFilePath")
    String defectImageFilePath;
}


@Data
class mDieList {

    @JsonProperty("$type")
    String type;

    @JsonProperty("$values")
    List<Die> values;
}

@Data
class Die {

    @JsonProperty("$type")
    String type;

    @JsonProperty("Id")
    Integer id;

    @JsonProperty("DieIndexX")
    Integer dieIndexX;

    @JsonProperty("DieIndexY")
    Integer dieIndexY;

    @JsonProperty("PositionX")
    Position positionX;

    @JsonProperty("PositionY")
    Position positionY;

    @JsonProperty("Width")
    Position width;

    @JsonProperty("Height")
    Position height;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class Position {

//    @JsonProperty("$type")
//    String type;
//
//    @JsonProperty("Unit")
//    String unit;

    @JsonProperty("Value")
    BigDecimal value;
}
