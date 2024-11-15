interface NotchAngle {
    Value: number;
}

interface EbrAverageThickness {
    Value: number;
}

interface WaferLoadingCenterOffsetX {
    Value: number;
}

interface WaferLoadingCenterOffsetY {
    Value: number;
}

interface AfterAlignCenterOffsetX {
    Value: number;
}

interface AfterAlignCenterOffsetY {
    Value: number;
}

interface ChuckFlatnessAngle {
    Value: number;
}

interface Angle {
    Value: number;
}

interface MeasuredEbrWidth {
    Value: number;
}

interface BevelWidth {
    Value: number;
}

interface FittedEbrWidth {
    Value: number;
}

interface EbrDividedData {
    Index: number;
    Angle: Angle;
    MeasuredEbrWidth: MeasuredEbrWidth;
    BevelWidth: BevelWidth;
    FittedEbrWidth: FittedEbrWidth;
}

interface EbrDividedDataList {
    $values: EbrDividedData[];
}

export interface EbrResultData {
    EbrResultType: number;
    NotchAngle: NotchAngle;
    EbrDivideCount: number;
    EbrAverageThickness: EbrAverageThickness;
    WaferLoadingCenterOffsetX: WaferLoadingCenterOffsetX;
    WaferLoadingCenterOffsetY: WaferLoadingCenterOffsetY;
    AfterAlignCenterOffsetX: AfterAlignCenterOffsetX;
    AfterAlignCenterOffsetY: AfterAlignCenterOffsetY;
    ChuckFlatnessAngle: ChuckFlatnessAngle;
    m_ebrDividedDataList: EbrDividedDataList;
}
