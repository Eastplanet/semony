import { DieLocation } from "../types";

// DefectRecordSpec 타입 정의

export interface DefectRecordSpecWithoutStep {
    defectID: number;
  defectArea: number;
  gdsX: number;
  gdsY: number;
  grayMin: number;
  grayMax: number;
  grayMean: number;
  alg: number;
  radius: number;
  select: number;
  yrel: number;
  xsize: number;
  xrel: number;
  ysize: number;
  xindex: number;
  yindex: number;
}

// SummarySpec 타입 정의
interface SummarySpec {
  testNo: number;
  defDensity: number;
  ndie: number;
  ndefect: number;
  ndefDie: number;
}

// WaferInspection 타입 정의
interface WaferInspection {
  fileVersion: string;
  fileTimestamp: string;
  inspectionStationID: string[];
  sampleType: string;
  resultTimestamp: string;
  lotID: string;
  sampleSize: [number, number];
  setupID: [string, string, string];
  stepID: string;
  coatorID: number;
  spinName: string | null;
  sampleOrientationMarkType: string;
  orientationMarkLocation: string;
  diePitch: [number, number];
  shotComposition: [number, number];
  dieOrigin: [number, number];
  waferID: string;
  slot: number;
  sampleCenterLocation: [number, number];
  inspectionTest: number;
  sampleTestPlan: number;
  dieLocations: DieLocation | null; // 타입이 명확하지 않으므로 any로 설정
  defectRecordSpec: DefectRecordSpecWithoutStep[];
  summarySpec: SummarySpec;
  defectCnt: number;
  defectDieCnt: number;
}

// 최상위 데이터 구조 타입 정의
interface WaferInspectionsData {
  waferInspections: WaferInspection[];
}

export const DieLocations: DieLocation[] = [
    {
        "xindex": -18,
        "yindex": -9
    },
    {
        "xindex": -18,
        "yindex": -8
    },
    {
        "xindex": -18,
        "yindex": -7
    },
    {
        "xindex": -18,
        "yindex": -6
    },
    {
        "xindex": -18,
        "yindex": -5
    },
    {
        "xindex": -18,
        "yindex": -4
    },
    {
        "xindex": -18,
        "yindex": -3
    },
    {
        "xindex": -18,
        "yindex": -2
    },
    {
        "xindex": -18,
        "yindex": -1
    },
    {
        "xindex": -18,
        "yindex": 0
    },
    {
        "xindex": -18,
        "yindex": 1
    },
    {
        "xindex": -18,
        "yindex": 2
    },
    {
        "xindex": -18,
        "yindex": 3
    },
    {
        "xindex": -18,
        "yindex": 4
    },
    {
        "xindex": -18,
        "yindex": 5
    },
    {
        "xindex": -18,
        "yindex": 6
    },
    {
        "xindex": -18,
        "yindex": 7
    },
    {
        "xindex": -18,
        "yindex": 8
    },
    {
        "xindex": -17,
        "yindex": -13
    },
    {
        "xindex": -17,
        "yindex": -12
    },
    {
        "xindex": -17,
        "yindex": -11
    },
    {
        "xindex": -17,
        "yindex": -10
    },
    {
        "xindex": -17,
        "yindex": -9
    },
    {
        "xindex": -17,
        "yindex": -8
    },
    {
        "xindex": -17,
        "yindex": -7
    },
    {
        "xindex": -17,
        "yindex": -6
    },
    {
        "xindex": -17,
        "yindex": -5
    },
    {
        "xindex": -17,
        "yindex": -4
    },
    {
        "xindex": -17,
        "yindex": -3
    },
    {
        "xindex": -17,
        "yindex": -2
    },
    {
        "xindex": -17,
        "yindex": -1
    },
    {
        "xindex": -17,
        "yindex": 0
    },
    {
        "xindex": -17,
        "yindex": 1
    },
    {
        "xindex": -17,
        "yindex": 2
    },
    {
        "xindex": -17,
        "yindex": 3
    },
    {
        "xindex": -17,
        "yindex": 4
    },
    {
        "xindex": -17,
        "yindex": 5
    },
    {
        "xindex": -17,
        "yindex": 6
    },
    {
        "xindex": -17,
        "yindex": 7
    },
    {
        "xindex": -17,
        "yindex": 8
    },
    {
        "xindex": -17,
        "yindex": 9
    },
    {
        "xindex": -17,
        "yindex": 10
    },
    {
        "xindex": -17,
        "yindex": 11
    },
    {
        "xindex": -17,
        "yindex": 12
    },
    {
        "xindex": -16,
        "yindex": -16
    },
    {
        "xindex": -16,
        "yindex": -15
    },
    {
        "xindex": -16,
        "yindex": -14
    },
    {
        "xindex": -16,
        "yindex": -13
    },
    {
        "xindex": -16,
        "yindex": -12
    },
    {
        "xindex": -16,
        "yindex": -11
    },
    {
        "xindex": -16,
        "yindex": -10
    },
    {
        "xindex": -16,
        "yindex": -9
    },
    {
        "xindex": -16,
        "yindex": -8
    },
    {
        "xindex": -16,
        "yindex": -7
    },
    {
        "xindex": -16,
        "yindex": -6
    },
    {
        "xindex": -16,
        "yindex": -5
    },
    {
        "xindex": -16,
        "yindex": -4
    },
    {
        "xindex": -16,
        "yindex": -3
    },
    {
        "xindex": -16,
        "yindex": -2
    },
    {
        "xindex": -16,
        "yindex": -1
    },
    {
        "xindex": -16,
        "yindex": 0
    },
    {
        "xindex": -16,
        "yindex": 1
    },
    {
        "xindex": -16,
        "yindex": 2
    },
    {
        "xindex": -16,
        "yindex": 3
    },
    {
        "xindex": -16,
        "yindex": 4
    },
    {
        "xindex": -16,
        "yindex": 5
    },
    {
        "xindex": -16,
        "yindex": 6
    },
    {
        "xindex": -16,
        "yindex": 7
    },
    {
        "xindex": -16,
        "yindex": 8
    },
    {
        "xindex": -16,
        "yindex": 9
    },
    {
        "xindex": -16,
        "yindex": 10
    },
    {
        "xindex": -16,
        "yindex": 11
    },
    {
        "xindex": -16,
        "yindex": 12
    },
    {
        "xindex": -16,
        "yindex": 13
    },
    {
        "xindex": -16,
        "yindex": 14
    },
    {
        "xindex": -16,
        "yindex": 15
    },
    {
        "xindex": -15,
        "yindex": -18
    },
    {
        "xindex": -15,
        "yindex": -17
    },
    {
        "xindex": -15,
        "yindex": -16
    },
    {
        "xindex": -15,
        "yindex": -15
    },
    {
        "xindex": -15,
        "yindex": -14
    },
    {
        "xindex": -15,
        "yindex": -13
    },
    {
        "xindex": -15,
        "yindex": -12
    },
    {
        "xindex": -15,
        "yindex": -11
    },
    {
        "xindex": -15,
        "yindex": -10
    },
    {
        "xindex": -15,
        "yindex": -9
    },
    {
        "xindex": -15,
        "yindex": -8
    },
    {
        "xindex": -15,
        "yindex": -7
    },
    {
        "xindex": -15,
        "yindex": -6
    },
    {
        "xindex": -15,
        "yindex": -5
    },
    {
        "xindex": -15,
        "yindex": -4
    },
    {
        "xindex": -15,
        "yindex": -3
    },
    {
        "xindex": -15,
        "yindex": -2
    },
    {
        "xindex": -15,
        "yindex": -1
    },
    {
        "xindex": -15,
        "yindex": 0
    },
    {
        "xindex": -15,
        "yindex": 1
    },
    {
        "xindex": -15,
        "yindex": 2
    },
    {
        "xindex": -15,
        "yindex": 3
    },
    {
        "xindex": -15,
        "yindex": 4
    },
    {
        "xindex": -15,
        "yindex": 5
    },
    {
        "xindex": -15,
        "yindex": 6
    },
    {
        "xindex": -15,
        "yindex": 7
    },
    {
        "xindex": -15,
        "yindex": 8
    },
    {
        "xindex": -15,
        "yindex": 9
    },
    {
        "xindex": -15,
        "yindex": 10
    },
    {
        "xindex": -15,
        "yindex": 11
    },
    {
        "xindex": -15,
        "yindex": 12
    },
    {
        "xindex": -15,
        "yindex": 13
    },
    {
        "xindex": -15,
        "yindex": 14
    },
    {
        "xindex": -15,
        "yindex": 15
    },
    {
        "xindex": -15,
        "yindex": 16
    },
    {
        "xindex": -15,
        "yindex": 17
    },
    {
        "xindex": -15,
        "yindex": 18
    },
    {
        "xindex": -14,
        "yindex": -20
    },
    {
        "xindex": -14,
        "yindex": -19
    },
    {
        "xindex": -14,
        "yindex": -18
    },
    {
        "xindex": -14,
        "yindex": -17
    },
    {
        "xindex": -14,
        "yindex": -16
    },
    {
        "xindex": -14,
        "yindex": -15
    },
    {
        "xindex": -14,
        "yindex": -14
    },
    {
        "xindex": -14,
        "yindex": -13
    },
    {
        "xindex": -14,
        "yindex": -12
    },
    {
        "xindex": -14,
        "yindex": -11
    },
    {
        "xindex": -14,
        "yindex": -10
    },
    {
        "xindex": -14,
        "yindex": -9
    },
    {
        "xindex": -14,
        "yindex": -8
    },
    {
        "xindex": -14,
        "yindex": -7
    },
    {
        "xindex": -14,
        "yindex": -6
    },
    {
        "xindex": -14,
        "yindex": -5
    },
    {
        "xindex": -14,
        "yindex": -4
    },
    {
        "xindex": -14,
        "yindex": -3
    },
    {
        "xindex": -14,
        "yindex": -2
    },
    {
        "xindex": -14,
        "yindex": -1
    },
    {
        "xindex": -14,
        "yindex": 0
    },
    {
        "xindex": -14,
        "yindex": 1
    },
    {
        "xindex": -14,
        "yindex": 2
    },
    {
        "xindex": -14,
        "yindex": 3
    },
    {
        "xindex": -14,
        "yindex": 4
    },
    {
        "xindex": -14,
        "yindex": 5
    },
    {
        "xindex": -14,
        "yindex": 6
    },
    {
        "xindex": -14,
        "yindex": 7
    },
    {
        "xindex": -14,
        "yindex": 8
    },
    {
        "xindex": -14,
        "yindex": 9
    },
    {
        "xindex": -14,
        "yindex": 10
    },
    {
        "xindex": -14,
        "yindex": 11
    },
    {
        "xindex": -14,
        "yindex": 12
    },
    {
        "xindex": -14,
        "yindex": 13
    },
    {
        "xindex": -14,
        "yindex": 14
    },
    {
        "xindex": -14,
        "yindex": 15
    },
    {
        "xindex": -14,
        "yindex": 16
    },
    {
        "xindex": -14,
        "yindex": 17
    },
    {
        "xindex": -14,
        "yindex": 18
    },
    {
        "xindex": -14,
        "yindex": 19
    },
    {
        "xindex": -14,
        "yindex": 20
    },
    {
        "xindex": -13,
        "yindex": -22
    },
    {
        "xindex": -13,
        "yindex": -21
    },
    {
        "xindex": -13,
        "yindex": -20
    },
    {
        "xindex": -13,
        "yindex": -19
    },
    {
        "xindex": -13,
        "yindex": -18
    },
    {
        "xindex": -13,
        "yindex": -17
    },
    {
        "xindex": -13,
        "yindex": -16
    },
    {
        "xindex": -13,
        "yindex": -15
    },
    {
        "xindex": -13,
        "yindex": -14
    },
    {
        "xindex": -13,
        "yindex": -13
    },
    {
        "xindex": -13,
        "yindex": -12
    },
    {
        "xindex": -13,
        "yindex": -11
    },
    {
        "xindex": -13,
        "yindex": -10
    },
    {
        "xindex": -13,
        "yindex": -9
    },
    {
        "xindex": -13,
        "yindex": -8
    },
    {
        "xindex": -13,
        "yindex": -7
    },
    {
        "xindex": -13,
        "yindex": -6
    },
    {
        "xindex": -13,
        "yindex": -5
    },
    {
        "xindex": -13,
        "yindex": -4
    },
    {
        "xindex": -13,
        "yindex": -3
    },
    {
        "xindex": -13,
        "yindex": -2
    },
    {
        "xindex": -13,
        "yindex": -1
    },
    {
        "xindex": -13,
        "yindex": 0
    },
    {
        "xindex": -13,
        "yindex": 1
    },
    {
        "xindex": -13,
        "yindex": 2
    },
    {
        "xindex": -13,
        "yindex": 3
    },
    {
        "xindex": -13,
        "yindex": 4
    },
    {
        "xindex": -13,
        "yindex": 5
    },
    {
        "xindex": -13,
        "yindex": 6
    },
    {
        "xindex": -13,
        "yindex": 7
    },
    {
        "xindex": -13,
        "yindex": 8
    },
    {
        "xindex": -13,
        "yindex": 9
    },
    {
        "xindex": -13,
        "yindex": 10
    },
    {
        "xindex": -13,
        "yindex": 11
    },
    {
        "xindex": -13,
        "yindex": 12
    },
    {
        "xindex": -13,
        "yindex": 13
    },
    {
        "xindex": -13,
        "yindex": 14
    },
    {
        "xindex": -13,
        "yindex": 15
    },
    {
        "xindex": -13,
        "yindex": 16
    },
    {
        "xindex": -13,
        "yindex": 17
    },
    {
        "xindex": -13,
        "yindex": 18
    },
    {
        "xindex": -13,
        "yindex": 19
    },
    {
        "xindex": -13,
        "yindex": 20
    },
    {
        "xindex": -13,
        "yindex": 21
    },
    {
        "xindex": -12,
        "yindex": -23
    },
    {
        "xindex": -12,
        "yindex": -22
    },
    {
        "xindex": -12,
        "yindex": -21
    },
    {
        "xindex": -12,
        "yindex": -20
    },
    {
        "xindex": -12,
        "yindex": -19
    },
    {
        "xindex": -12,
        "yindex": -18
    },
    {
        "xindex": -12,
        "yindex": -17
    },
    {
        "xindex": -12,
        "yindex": -16
    },
    {
        "xindex": -12,
        "yindex": -15
    },
    {
        "xindex": -12,
        "yindex": -14
    },
    {
        "xindex": -12,
        "yindex": -13
    },
    {
        "xindex": -12,
        "yindex": -12
    },
    {
        "xindex": -12,
        "yindex": -11
    },
    {
        "xindex": -12,
        "yindex": -10
    },
    {
        "xindex": -12,
        "yindex": -9
    },
    {
        "xindex": -12,
        "yindex": -8
    },
    {
        "xindex": -12,
        "yindex": -7
    },
    {
        "xindex": -12,
        "yindex": -6
    },
    {
        "xindex": -12,
        "yindex": -5
    },
    {
        "xindex": -12,
        "yindex": -4
    },
    {
        "xindex": -12,
        "yindex": -3
    },
    {
        "xindex": -12,
        "yindex": -2
    },
    {
        "xindex": -12,
        "yindex": -1
    },
    {
        "xindex": -12,
        "yindex": 0
    },
    {
        "xindex": -12,
        "yindex": 1
    },
    {
        "xindex": -12,
        "yindex": 2
    },
    {
        "xindex": -12,
        "yindex": 3
    },
    {
        "xindex": -12,
        "yindex": 4
    },
    {
        "xindex": -12,
        "yindex": 5
    },
    {
        "xindex": -12,
        "yindex": 6
    },
    {
        "xindex": -12,
        "yindex": 7
    },
    {
        "xindex": -12,
        "yindex": 8
    },
    {
        "xindex": -12,
        "yindex": 9
    },
    {
        "xindex": -12,
        "yindex": 10
    },
    {
        "xindex": -12,
        "yindex": 11
    },
    {
        "xindex": -12,
        "yindex": 12
    },
    {
        "xindex": -12,
        "yindex": 13
    },
    {
        "xindex": -12,
        "yindex": 14
    },
    {
        "xindex": -12,
        "yindex": 15
    },
    {
        "xindex": -12,
        "yindex": 16
    },
    {
        "xindex": -12,
        "yindex": 17
    },
    {
        "xindex": -12,
        "yindex": 18
    },
    {
        "xindex": -12,
        "yindex": 19
    },
    {
        "xindex": -12,
        "yindex": 20
    },
    {
        "xindex": -12,
        "yindex": 21
    },
    {
        "xindex": -12,
        "yindex": 22
    },
    {
        "xindex": -12,
        "yindex": 23
    },
    {
        "xindex": -11,
        "yindex": -24
    },
    {
        "xindex": -11,
        "yindex": -23
    },
    {
        "xindex": -11,
        "yindex": -22
    },
    {
        "xindex": -11,
        "yindex": -21
    },
    {
        "xindex": -11,
        "yindex": -20
    },
    {
        "xindex": -11,
        "yindex": -19
    },
    {
        "xindex": -11,
        "yindex": -18
    },
    {
        "xindex": -11,
        "yindex": -17
    },
    {
        "xindex": -11,
        "yindex": -16
    },
    {
        "xindex": -11,
        "yindex": -15
    },
    {
        "xindex": -11,
        "yindex": -14
    },
    {
        "xindex": -11,
        "yindex": -13
    },
    {
        "xindex": -11,
        "yindex": -12
    },
    {
        "xindex": -11,
        "yindex": -11
    },
    {
        "xindex": -11,
        "yindex": -10
    },
    {
        "xindex": -11,
        "yindex": -9
    },
    {
        "xindex": -11,
        "yindex": -8
    },
    {
        "xindex": -11,
        "yindex": -7
    },
    {
        "xindex": -11,
        "yindex": -6
    },
    {
        "xindex": -11,
        "yindex": -5
    },
    {
        "xindex": -11,
        "yindex": -4
    },
    {
        "xindex": -11,
        "yindex": -3
    },
    {
        "xindex": -11,
        "yindex": -2
    },
    {
        "xindex": -11,
        "yindex": -1
    },
    {
        "xindex": -11,
        "yindex": 0
    },
    {
        "xindex": -11,
        "yindex": 1
    },
    {
        "xindex": -11,
        "yindex": 2
    },
    {
        "xindex": -11,
        "yindex": 3
    },
    {
        "xindex": -11,
        "yindex": 4
    },
    {
        "xindex": -11,
        "yindex": 5
    },
    {
        "xindex": -11,
        "yindex": 6
    },
    {
        "xindex": -11,
        "yindex": 7
    },
    {
        "xindex": -11,
        "yindex": 8
    },
    {
        "xindex": -11,
        "yindex": 9
    },
    {
        "xindex": -11,
        "yindex": 10
    },
    {
        "xindex": -11,
        "yindex": 11
    },
    {
        "xindex": -11,
        "yindex": 12
    },
    {
        "xindex": -11,
        "yindex": 13
    },
    {
        "xindex": -11,
        "yindex": 14
    },
    {
        "xindex": -11,
        "yindex": 15
    },
    {
        "xindex": -11,
        "yindex": 16
    },
    {
        "xindex": -11,
        "yindex": 17
    },
    {
        "xindex": -11,
        "yindex": 18
    },
    {
        "xindex": -11,
        "yindex": 19
    },
    {
        "xindex": -11,
        "yindex": 20
    },
    {
        "xindex": -11,
        "yindex": 21
    },
    {
        "xindex": -11,
        "yindex": 22
    },
    {
        "xindex": -11,
        "yindex": 23
    },
    {
        "xindex": -11,
        "yindex": 24
    },
    {
        "xindex": -10,
        "yindex": -26
    },
    {
        "xindex": -10,
        "yindex": -25
    },
    {
        "xindex": -10,
        "yindex": -24
    },
    {
        "xindex": -10,
        "yindex": -23
    },
    {
        "xindex": -10,
        "yindex": -22
    },
    {
        "xindex": -10,
        "yindex": -21
    },
    {
        "xindex": -10,
        "yindex": -20
    },
    {
        "xindex": -10,
        "yindex": -19
    },
    {
        "xindex": -10,
        "yindex": -18
    },
    {
        "xindex": -10,
        "yindex": -17
    },
    {
        "xindex": -10,
        "yindex": -16
    },
    {
        "xindex": -10,
        "yindex": -15
    },
    {
        "xindex": -10,
        "yindex": -14
    },
    {
        "xindex": -10,
        "yindex": -13
    },
    {
        "xindex": -10,
        "yindex": -12
    },
    {
        "xindex": -10,
        "yindex": -11
    },
    {
        "xindex": -10,
        "yindex": -10
    },
    {
        "xindex": -10,
        "yindex": -9
    },
    {
        "xindex": -10,
        "yindex": -8
    },
    {
        "xindex": -10,
        "yindex": -7
    },
    {
        "xindex": -10,
        "yindex": -6
    },
    {
        "xindex": -10,
        "yindex": -5
    },
    {
        "xindex": -10,
        "yindex": -4
    },
    {
        "xindex": -10,
        "yindex": -3
    },
    {
        "xindex": -10,
        "yindex": -2
    },
    {
        "xindex": -10,
        "yindex": -1
    },
    {
        "xindex": -10,
        "yindex": 0
    },
    {
        "xindex": -10,
        "yindex": 1
    },
    {
        "xindex": -10,
        "yindex": 2
    },
    {
        "xindex": -10,
        "yindex": 3
    },
    {
        "xindex": -10,
        "yindex": 4
    },
    {
        "xindex": -10,
        "yindex": 5
    },
    {
        "xindex": -10,
        "yindex": 6
    },
    {
        "xindex": -10,
        "yindex": 7
    },
    {
        "xindex": -10,
        "yindex": 8
    },
    {
        "xindex": -10,
        "yindex": 9
    },
    {
        "xindex": -10,
        "yindex": 10
    },
    {
        "xindex": -10,
        "yindex": 11
    },
    {
        "xindex": -10,
        "yindex": 12
    },
    {
        "xindex": -10,
        "yindex": 13
    },
    {
        "xindex": -10,
        "yindex": 14
    },
    {
        "xindex": -10,
        "yindex": 15
    },
    {
        "xindex": -10,
        "yindex": 16
    },
    {
        "xindex": -10,
        "yindex": 17
    },
    {
        "xindex": -10,
        "yindex": 18
    },
    {
        "xindex": -10,
        "yindex": 19
    },
    {
        "xindex": -10,
        "yindex": 20
    },
    {
        "xindex": -10,
        "yindex": 21
    },
    {
        "xindex": -10,
        "yindex": 22
    },
    {
        "xindex": -10,
        "yindex": 23
    },
    {
        "xindex": -10,
        "yindex": 24
    },
    {
        "xindex": -10,
        "yindex": 25
    },
    {
        "xindex": -9,
        "yindex": -26
    },
    {
        "xindex": -9,
        "yindex": -25
    },
    {
        "xindex": -9,
        "yindex": -24
    },
    {
        "xindex": -9,
        "yindex": -23
    },
    {
        "xindex": -9,
        "yindex": -22
    },
    {
        "xindex": -9,
        "yindex": -21
    },
    {
        "xindex": -9,
        "yindex": -20
    },
    {
        "xindex": -9,
        "yindex": -19
    },
    {
        "xindex": -9,
        "yindex": -18
    },
    {
        "xindex": -9,
        "yindex": -17
    },
    {
        "xindex": -9,
        "yindex": -16
    },
    {
        "xindex": -9,
        "yindex": -15
    },
    {
        "xindex": -9,
        "yindex": -14
    },
    {
        "xindex": -9,
        "yindex": -13
    },
    {
        "xindex": -9,
        "yindex": -12
    },
    {
        "xindex": -9,
        "yindex": -11
    },
    {
        "xindex": -9,
        "yindex": -10
    },
    {
        "xindex": -9,
        "yindex": -9
    },
    {
        "xindex": -9,
        "yindex": -8
    },
    {
        "xindex": -9,
        "yindex": -7
    },
    {
        "xindex": -9,
        "yindex": -6
    },
    {
        "xindex": -9,
        "yindex": -5
    },
    {
        "xindex": -9,
        "yindex": -4
    },
    {
        "xindex": -9,
        "yindex": -3
    },
    {
        "xindex": -9,
        "yindex": -2
    },
    {
        "xindex": -9,
        "yindex": -1
    },
    {
        "xindex": -9,
        "yindex": 0
    },
    {
        "xindex": -9,
        "yindex": 1
    },
    {
        "xindex": -9,
        "yindex": 2
    },
    {
        "xindex": -9,
        "yindex": 3
    },
    {
        "xindex": -9,
        "yindex": 4
    },
    {
        "xindex": -9,
        "yindex": 5
    },
    {
        "xindex": -9,
        "yindex": 6
    },
    {
        "xindex": -9,
        "yindex": 7
    },
    {
        "xindex": -9,
        "yindex": 8
    },
    {
        "xindex": -9,
        "yindex": 9
    },
    {
        "xindex": -9,
        "yindex": 10
    },
    {
        "xindex": -9,
        "yindex": 11
    },
    {
        "xindex": -9,
        "yindex": 12
    },
    {
        "xindex": -9,
        "yindex": 13
    },
    {
        "xindex": -9,
        "yindex": 14
    },
    {
        "xindex": -9,
        "yindex": 15
    },
    {
        "xindex": -9,
        "yindex": 16
    },
    {
        "xindex": -9,
        "yindex": 17
    },
    {
        "xindex": -9,
        "yindex": 18
    },
    {
        "xindex": -9,
        "yindex": 19
    },
    {
        "xindex": -9,
        "yindex": 20
    },
    {
        "xindex": -9,
        "yindex": 21
    },
    {
        "xindex": -9,
        "yindex": 22
    },
    {
        "xindex": -9,
        "yindex": 23
    },
    {
        "xindex": -9,
        "yindex": 24
    },
    {
        "xindex": -9,
        "yindex": 25
    },
    {
        "xindex": -9,
        "yindex": 26
    },
    {
        "xindex": -8,
        "yindex": -27
    },
    {
        "xindex": -8,
        "yindex": -26
    },
    {
        "xindex": -8,
        "yindex": -25
    },
    {
        "xindex": -8,
        "yindex": -24
    },
    {
        "xindex": -8,
        "yindex": -23
    },
    {
        "xindex": -8,
        "yindex": -22
    },
    {
        "xindex": -8,
        "yindex": -21
    },
    {
        "xindex": -8,
        "yindex": -20
    },
    {
        "xindex": -8,
        "yindex": -19
    },
    {
        "xindex": -8,
        "yindex": -18
    },
    {
        "xindex": -8,
        "yindex": -17
    },
    {
        "xindex": -8,
        "yindex": -16
    },
    {
        "xindex": -8,
        "yindex": -15
    },
    {
        "xindex": -8,
        "yindex": -14
    },
    {
        "xindex": -8,
        "yindex": -13
    },
    {
        "xindex": -8,
        "yindex": -12
    },
    {
        "xindex": -8,
        "yindex": -11
    },
    {
        "xindex": -8,
        "yindex": -10
    },
    {
        "xindex": -8,
        "yindex": -9
    },
    {
        "xindex": -8,
        "yindex": -8
    },
    {
        "xindex": -8,
        "yindex": -7
    },
    {
        "xindex": -8,
        "yindex": -6
    },
    {
        "xindex": -8,
        "yindex": -5
    },
    {
        "xindex": -8,
        "yindex": -4
    },
    {
        "xindex": -8,
        "yindex": -3
    },
    {
        "xindex": -8,
        "yindex": -2
    },
    {
        "xindex": -8,
        "yindex": -1
    },
    {
        "xindex": -8,
        "yindex": 0
    },
    {
        "xindex": -8,
        "yindex": 1
    },
    {
        "xindex": -8,
        "yindex": 2
    },
    {
        "xindex": -8,
        "yindex": 3
    },
    {
        "xindex": -8,
        "yindex": 4
    },
    {
        "xindex": -8,
        "yindex": 5
    },
    {
        "xindex": -8,
        "yindex": 6
    },
    {
        "xindex": -8,
        "yindex": 7
    },
    {
        "xindex": -8,
        "yindex": 8
    },
    {
        "xindex": -8,
        "yindex": 9
    },
    {
        "xindex": -8,
        "yindex": 10
    },
    {
        "xindex": -8,
        "yindex": 11
    },
    {
        "xindex": -8,
        "yindex": 12
    },
    {
        "xindex": -8,
        "yindex": 13
    },
    {
        "xindex": -8,
        "yindex": 14
    },
    {
        "xindex": -8,
        "yindex": 15
    },
    {
        "xindex": -8,
        "yindex": 16
    },
    {
        "xindex": -8,
        "yindex": 17
    },
    {
        "xindex": -8,
        "yindex": 18
    },
    {
        "xindex": -8,
        "yindex": 19
    },
    {
        "xindex": -8,
        "yindex": 20
    },
    {
        "xindex": -8,
        "yindex": 21
    },
    {
        "xindex": -8,
        "yindex": 22
    },
    {
        "xindex": -8,
        "yindex": 23
    },
    {
        "xindex": -8,
        "yindex": 24
    },
    {
        "xindex": -8,
        "yindex": 25
    },
    {
        "xindex": -8,
        "yindex": 26
    },
    {
        "xindex": -8,
        "yindex": 27
    },
    {
        "xindex": -7,
        "yindex": -28
    },
    {
        "xindex": -7,
        "yindex": -27
    },
    {
        "xindex": -7,
        "yindex": -26
    },
    {
        "xindex": -7,
        "yindex": -25
    },
    {
        "xindex": -7,
        "yindex": -24
    },
    {
        "xindex": -7,
        "yindex": -23
    },
    {
        "xindex": -7,
        "yindex": -22
    },
    {
        "xindex": -7,
        "yindex": -21
    },
    {
        "xindex": -7,
        "yindex": -20
    },
    {
        "xindex": -7,
        "yindex": -19
    },
    {
        "xindex": -7,
        "yindex": -18
    },
    {
        "xindex": -7,
        "yindex": -17
    },
    {
        "xindex": -7,
        "yindex": -16
    },
    {
        "xindex": -7,
        "yindex": -15
    },
    {
        "xindex": -7,
        "yindex": -14
    },
    {
        "xindex": -7,
        "yindex": -13
    },
    {
        "xindex": -7,
        "yindex": -12
    },
    {
        "xindex": -7,
        "yindex": -11
    },
    {
        "xindex": -7,
        "yindex": -10
    },
    {
        "xindex": -7,
        "yindex": -9
    },
    {
        "xindex": -7,
        "yindex": -8
    },
    {
        "xindex": -7,
        "yindex": -7
    },
    {
        "xindex": -7,
        "yindex": -6
    },
    {
        "xindex": -7,
        "yindex": -5
    },
    {
        "xindex": -7,
        "yindex": -4
    },
    {
        "xindex": -7,
        "yindex": -3
    },
    {
        "xindex": -7,
        "yindex": -2
    },
    {
        "xindex": -7,
        "yindex": -1
    },
    {
        "xindex": -7,
        "yindex": 0
    },
    {
        "xindex": -7,
        "yindex": 1
    },
    {
        "xindex": -7,
        "yindex": 2
    },
    {
        "xindex": -7,
        "yindex": 3
    },
    {
        "xindex": -7,
        "yindex": 4
    },
    {
        "xindex": -7,
        "yindex": 5
    },
    {
        "xindex": -7,
        "yindex": 6
    },
    {
        "xindex": -7,
        "yindex": 7
    },
    {
        "xindex": -7,
        "yindex": 8
    },
    {
        "xindex": -7,
        "yindex": 9
    },
    {
        "xindex": -7,
        "yindex": 10
    },
    {
        "xindex": -7,
        "yindex": 11
    },
    {
        "xindex": -7,
        "yindex": 12
    },
    {
        "xindex": -7,
        "yindex": 13
    },
    {
        "xindex": -7,
        "yindex": 14
    },
    {
        "xindex": -7,
        "yindex": 15
    },
    {
        "xindex": -7,
        "yindex": 16
    },
    {
        "xindex": -7,
        "yindex": 17
    },
    {
        "xindex": -7,
        "yindex": 18
    },
    {
        "xindex": -7,
        "yindex": 19
    },
    {
        "xindex": -7,
        "yindex": 20
    },
    {
        "xindex": -7,
        "yindex": 21
    },
    {
        "xindex": -7,
        "yindex": 22
    },
    {
        "xindex": -7,
        "yindex": 23
    },
    {
        "xindex": -7,
        "yindex": 24
    },
    {
        "xindex": -7,
        "yindex": 25
    },
    {
        "xindex": -7,
        "yindex": 26
    },
    {
        "xindex": -7,
        "yindex": 27
    },
    {
        "xindex": -6,
        "yindex": -28
    },
    {
        "xindex": -6,
        "yindex": -27
    },
    {
        "xindex": -6,
        "yindex": -26
    },
    {
        "xindex": -6,
        "yindex": -25
    },
    {
        "xindex": -6,
        "yindex": -24
    },
    {
        "xindex": -6,
        "yindex": -23
    },
    {
        "xindex": -6,
        "yindex": -22
    },
    {
        "xindex": -6,
        "yindex": -21
    },
    {
        "xindex": -6,
        "yindex": -20
    },
    {
        "xindex": -6,
        "yindex": -19
    },
    {
        "xindex": -6,
        "yindex": -18
    },
    {
        "xindex": -6,
        "yindex": -17
    },
    {
        "xindex": -6,
        "yindex": -16
    },
    {
        "xindex": -6,
        "yindex": -15
    },
    {
        "xindex": -6,
        "yindex": -14
    },
    {
        "xindex": -6,
        "yindex": -13
    },
    {
        "xindex": -6,
        "yindex": -12
    },
    {
        "xindex": -6,
        "yindex": -11
    },
    {
        "xindex": -6,
        "yindex": -10
    },
    {
        "xindex": -6,
        "yindex": -9
    },
    {
        "xindex": -6,
        "yindex": -8
    },
    {
        "xindex": -6,
        "yindex": -7
    },
    {
        "xindex": -6,
        "yindex": -6
    },
    {
        "xindex": -6,
        "yindex": -5
    },
    {
        "xindex": -6,
        "yindex": -4
    },
    {
        "xindex": -6,
        "yindex": -3
    },
    {
        "xindex": -6,
        "yindex": -2
    },
    {
        "xindex": -6,
        "yindex": -1
    },
    {
        "xindex": -6,
        "yindex": 0
    },
    {
        "xindex": -6,
        "yindex": 1
    },
    {
        "xindex": -6,
        "yindex": 2
    },
    {
        "xindex": -6,
        "yindex": 3
    },
    {
        "xindex": -6,
        "yindex": 4
    },
    {
        "xindex": -6,
        "yindex": 5
    },
    {
        "xindex": -6,
        "yindex": 6
    },
    {
        "xindex": -6,
        "yindex": 7
    },
    {
        "xindex": -6,
        "yindex": 8
    },
    {
        "xindex": -6,
        "yindex": 9
    },
    {
        "xindex": -6,
        "yindex": 10
    },
    {
        "xindex": -6,
        "yindex": 11
    },
    {
        "xindex": -6,
        "yindex": 12
    },
    {
        "xindex": -6,
        "yindex": 13
    },
    {
        "xindex": -6,
        "yindex": 14
    },
    {
        "xindex": -6,
        "yindex": 15
    },
    {
        "xindex": -6,
        "yindex": 16
    },
    {
        "xindex": -6,
        "yindex": 17
    },
    {
        "xindex": -6,
        "yindex": 18
    },
    {
        "xindex": -6,
        "yindex": 19
    },
    {
        "xindex": -6,
        "yindex": 20
    },
    {
        "xindex": -6,
        "yindex": 21
    },
    {
        "xindex": -6,
        "yindex": 22
    },
    {
        "xindex": -6,
        "yindex": 23
    },
    {
        "xindex": -6,
        "yindex": 24
    },
    {
        "xindex": -6,
        "yindex": 25
    },
    {
        "xindex": -6,
        "yindex": 26
    },
    {
        "xindex": -6,
        "yindex": 27
    },
    {
        "xindex": -6,
        "yindex": 28
    },
    {
        "xindex": -5,
        "yindex": -29
    },
    {
        "xindex": -5,
        "yindex": -28
    },
    {
        "xindex": -5,
        "yindex": -27
    },
    {
        "xindex": -5,
        "yindex": -26
    },
    {
        "xindex": -5,
        "yindex": -25
    },
    {
        "xindex": -5,
        "yindex": -24
    },
    {
        "xindex": -5,
        "yindex": -23
    },
    {
        "xindex": -5,
        "yindex": -22
    },
    {
        "xindex": -5,
        "yindex": -21
    },
    {
        "xindex": -5,
        "yindex": -20
    },
    {
        "xindex": -5,
        "yindex": -19
    },
    {
        "xindex": -5,
        "yindex": -18
    },
    {
        "xindex": -5,
        "yindex": -17
    },
    {
        "xindex": -5,
        "yindex": -16
    },
    {
        "xindex": -5,
        "yindex": -15
    },
    {
        "xindex": -5,
        "yindex": -14
    },
    {
        "xindex": -5,
        "yindex": -13
    },
    {
        "xindex": -5,
        "yindex": -12
    },
    {
        "xindex": -5,
        "yindex": -11
    },
    {
        "xindex": -5,
        "yindex": -10
    },
    {
        "xindex": -5,
        "yindex": -9
    },
    {
        "xindex": -5,
        "yindex": -8
    },
    {
        "xindex": -5,
        "yindex": -7
    },
    {
        "xindex": -5,
        "yindex": -6
    },
    {
        "xindex": -5,
        "yindex": -5
    },
    {
        "xindex": -5,
        "yindex": -4
    },
    {
        "xindex": -5,
        "yindex": -3
    },
    {
        "xindex": -5,
        "yindex": -2
    },
    {
        "xindex": -5,
        "yindex": -1
    },
    {
        "xindex": -5,
        "yindex": 0
    },
    {
        "xindex": -5,
        "yindex": 1
    },
    {
        "xindex": -5,
        "yindex": 2
    },
    {
        "xindex": -5,
        "yindex": 3
    },
    {
        "xindex": -5,
        "yindex": 4
    },
    {
        "xindex": -5,
        "yindex": 5
    },
    {
        "xindex": -5,
        "yindex": 6
    },
    {
        "xindex": -5,
        "yindex": 7
    },
    {
        "xindex": -5,
        "yindex": 8
    },
    {
        "xindex": -5,
        "yindex": 9
    },
    {
        "xindex": -5,
        "yindex": 10
    },
    {
        "xindex": -5,
        "yindex": 11
    },
    {
        "xindex": -5,
        "yindex": 12
    },
    {
        "xindex": -5,
        "yindex": 13
    },
    {
        "xindex": -5,
        "yindex": 14
    },
    {
        "xindex": -5,
        "yindex": 15
    },
    {
        "xindex": -5,
        "yindex": 16
    },
    {
        "xindex": -5,
        "yindex": 17
    },
    {
        "xindex": -5,
        "yindex": 18
    },
    {
        "xindex": -5,
        "yindex": 19
    },
    {
        "xindex": -5,
        "yindex": 20
    },
    {
        "xindex": -5,
        "yindex": 21
    },
    {
        "xindex": -5,
        "yindex": 22
    },
    {
        "xindex": -5,
        "yindex": 23
    },
    {
        "xindex": -5,
        "yindex": 24
    },
    {
        "xindex": -5,
        "yindex": 25
    },
    {
        "xindex": -5,
        "yindex": 26
    },
    {
        "xindex": -5,
        "yindex": 27
    },
    {
        "xindex": -5,
        "yindex": 28
    },
    {
        "xindex": -4,
        "yindex": -29
    },
    {
        "xindex": -4,
        "yindex": -28
    },
    {
        "xindex": -4,
        "yindex": -27
    },
    {
        "xindex": -4,
        "yindex": -26
    },
    {
        "xindex": -4,
        "yindex": -25
    },
    {
        "xindex": -4,
        "yindex": -24
    },
    {
        "xindex": -4,
        "yindex": -23
    },
    {
        "xindex": -4,
        "yindex": -22
    },
    {
        "xindex": -4,
        "yindex": -21
    },
    {
        "xindex": -4,
        "yindex": -20
    },
    {
        "xindex": -4,
        "yindex": -19
    },
    {
        "xindex": -4,
        "yindex": -18
    },
    {
        "xindex": -4,
        "yindex": -17
    },
    {
        "xindex": -4,
        "yindex": -16
    },
    {
        "xindex": -4,
        "yindex": -15
    },
    {
        "xindex": -4,
        "yindex": -14
    },
    {
        "xindex": -4,
        "yindex": -13
    },
    {
        "xindex": -4,
        "yindex": -12
    },
    {
        "xindex": -4,
        "yindex": -11
    },
    {
        "xindex": -4,
        "yindex": -10
    },
    {
        "xindex": -4,
        "yindex": -9
    },
    {
        "xindex": -4,
        "yindex": -8
    },
    {
        "xindex": -4,
        "yindex": -7
    },
    {
        "xindex": -4,
        "yindex": -6
    },
    {
        "xindex": -4,
        "yindex": -5
    },
    {
        "xindex": -4,
        "yindex": -4
    },
    {
        "xindex": -4,
        "yindex": -3
    },
    {
        "xindex": -4,
        "yindex": -2
    },
    {
        "xindex": -4,
        "yindex": -1
    },
    {
        "xindex": -4,
        "yindex": 0
    },
    {
        "xindex": -4,
        "yindex": 1
    },
    {
        "xindex": -4,
        "yindex": 2
    },
    {
        "xindex": -4,
        "yindex": 3
    },
    {
        "xindex": -4,
        "yindex": 4
    },
    {
        "xindex": -4,
        "yindex": 5
    },
    {
        "xindex": -4,
        "yindex": 6
    },
    {
        "xindex": -4,
        "yindex": 7
    },
    {
        "xindex": -4,
        "yindex": 8
    },
    {
        "xindex": -4,
        "yindex": 9
    },
    {
        "xindex": -4,
        "yindex": 10
    },
    {
        "xindex": -4,
        "yindex": 11
    },
    {
        "xindex": -4,
        "yindex": 12
    },
    {
        "xindex": -4,
        "yindex": 13
    },
    {
        "xindex": -4,
        "yindex": 14
    },
    {
        "xindex": -4,
        "yindex": 15
    },
    {
        "xindex": -4,
        "yindex": 16
    },
    {
        "xindex": -4,
        "yindex": 17
    },
    {
        "xindex": -4,
        "yindex": 18
    },
    {
        "xindex": -4,
        "yindex": 19
    },
    {
        "xindex": -4,
        "yindex": 20
    },
    {
        "xindex": -4,
        "yindex": 21
    },
    {
        "xindex": -4,
        "yindex": 22
    },
    {
        "xindex": -4,
        "yindex": 23
    },
    {
        "xindex": -4,
        "yindex": 24
    },
    {
        "xindex": -4,
        "yindex": 25
    },
    {
        "xindex": -4,
        "yindex": 26
    },
    {
        "xindex": -4,
        "yindex": 27
    },
    {
        "xindex": -4,
        "yindex": 28
    },
    {
        "xindex": -3,
        "yindex": -29
    },
    {
        "xindex": -3,
        "yindex": -28
    },
    {
        "xindex": -3,
        "yindex": -27
    },
    {
        "xindex": -3,
        "yindex": -26
    },
    {
        "xindex": -3,
        "yindex": -25
    },
    {
        "xindex": -3,
        "yindex": -24
    },
    {
        "xindex": -3,
        "yindex": -23
    },
    {
        "xindex": -3,
        "yindex": -22
    },
    {
        "xindex": -3,
        "yindex": -21
    },
    {
        "xindex": -3,
        "yindex": -20
    },
    {
        "xindex": -3,
        "yindex": -19
    },
    {
        "xindex": -3,
        "yindex": -18
    },
    {
        "xindex": -3,
        "yindex": -17
    },
    {
        "xindex": -3,
        "yindex": -16
    },
    {
        "xindex": -3,
        "yindex": -15
    },
    {
        "xindex": -3,
        "yindex": -14
    },
    {
        "xindex": -3,
        "yindex": -13
    },
    {
        "xindex": -3,
        "yindex": -12
    },
    {
        "xindex": -3,
        "yindex": -11
    },
    {
        "xindex": -3,
        "yindex": -10
    },
    {
        "xindex": -3,
        "yindex": -9
    },
    {
        "xindex": -3,
        "yindex": -8
    },
    {
        "xindex": -3,
        "yindex": -7
    },
    {
        "xindex": -3,
        "yindex": -6
    },
    {
        "xindex": -3,
        "yindex": -5
    },
    {
        "xindex": -3,
        "yindex": -4
    },
    {
        "xindex": -3,
        "yindex": -3
    },
    {
        "xindex": -3,
        "yindex": -2
    },
    {
        "xindex": -3,
        "yindex": -1
    },
    {
        "xindex": -3,
        "yindex": 0
    },
    {
        "xindex": -3,
        "yindex": 1
    },
    {
        "xindex": -3,
        "yindex": 2
    },
    {
        "xindex": -3,
        "yindex": 3
    },
    {
        "xindex": -3,
        "yindex": 4
    },
    {
        "xindex": -3,
        "yindex": 5
    },
    {
        "xindex": -3,
        "yindex": 6
    },
    {
        "xindex": -3,
        "yindex": 7
    },
    {
        "xindex": -3,
        "yindex": 8
    },
    {
        "xindex": -3,
        "yindex": 9
    },
    {
        "xindex": -3,
        "yindex": 10
    },
    {
        "xindex": -3,
        "yindex": 11
    },
    {
        "xindex": -3,
        "yindex": 12
    },
    {
        "xindex": -3,
        "yindex": 13
    },
    {
        "xindex": -3,
        "yindex": 14
    },
    {
        "xindex": -3,
        "yindex": 15
    },
    {
        "xindex": -3,
        "yindex": 16
    },
    {
        "xindex": -3,
        "yindex": 17
    },
    {
        "xindex": -3,
        "yindex": 18
    },
    {
        "xindex": -3,
        "yindex": 19
    },
    {
        "xindex": -3,
        "yindex": 20
    },
    {
        "xindex": -3,
        "yindex": 21
    },
    {
        "xindex": -3,
        "yindex": 22
    },
    {
        "xindex": -3,
        "yindex": 23
    },
    {
        "xindex": -3,
        "yindex": 24
    },
    {
        "xindex": -3,
        "yindex": 25
    },
    {
        "xindex": -3,
        "yindex": 26
    },
    {
        "xindex": -3,
        "yindex": 27
    },
    {
        "xindex": -3,
        "yindex": 28
    },
    {
        "xindex": -3,
        "yindex": 29
    },
    {
        "xindex": -2,
        "yindex": -29
    },
    {
        "xindex": -2,
        "yindex": -28
    },
    {
        "xindex": -2,
        "yindex": -27
    },
    {
        "xindex": -2,
        "yindex": -26
    },
    {
        "xindex": -2,
        "yindex": -25
    },
    {
        "xindex": -2,
        "yindex": -24
    },
    {
        "xindex": -2,
        "yindex": -23
    },
    {
        "xindex": -2,
        "yindex": -22
    },
    {
        "xindex": -2,
        "yindex": -21
    },
    {
        "xindex": -2,
        "yindex": -20
    },
    {
        "xindex": -2,
        "yindex": -19
    },
    {
        "xindex": -2,
        "yindex": -18
    },
    {
        "xindex": -2,
        "yindex": -17
    },
    {
        "xindex": -2,
        "yindex": -16
    },
    {
        "xindex": -2,
        "yindex": -15
    },
    {
        "xindex": -2,
        "yindex": -14
    },
    {
        "xindex": -2,
        "yindex": -13
    },
    {
        "xindex": -2,
        "yindex": -12
    },
    {
        "xindex": -2,
        "yindex": -11
    },
    {
        "xindex": -2,
        "yindex": -10
    },
    {
        "xindex": -2,
        "yindex": -9
    },
    {
        "xindex": -2,
        "yindex": -8
    },
    {
        "xindex": -2,
        "yindex": -7
    },
    {
        "xindex": -2,
        "yindex": -6
    },
    {
        "xindex": -2,
        "yindex": -5
    },
    {
        "xindex": -2,
        "yindex": -4
    },
    {
        "xindex": -2,
        "yindex": -3
    },
    {
        "xindex": -2,
        "yindex": -2
    },
    {
        "xindex": -2,
        "yindex": -1
    },
    {
        "xindex": -2,
        "yindex": 0
    },
    {
        "xindex": -2,
        "yindex": 1
    },
    {
        "xindex": -2,
        "yindex": 2
    },
    {
        "xindex": -2,
        "yindex": 3
    },
    {
        "xindex": -2,
        "yindex": 4
    },
    {
        "xindex": -2,
        "yindex": 5
    },
    {
        "xindex": -2,
        "yindex": 6
    },
    {
        "xindex": -2,
        "yindex": 7
    },
    {
        "xindex": -2,
        "yindex": 8
    },
    {
        "xindex": -2,
        "yindex": 9
    },
    {
        "xindex": -2,
        "yindex": 10
    },
    {
        "xindex": -2,
        "yindex": 11
    },
    {
        "xindex": -2,
        "yindex": 12
    },
    {
        "xindex": -2,
        "yindex": 13
    },
    {
        "xindex": -2,
        "yindex": 14
    },
    {
        "xindex": -2,
        "yindex": 15
    },
    {
        "xindex": -2,
        "yindex": 16
    },
    {
        "xindex": -2,
        "yindex": 17
    },
    {
        "xindex": -2,
        "yindex": 18
    },
    {
        "xindex": -2,
        "yindex": 19
    },
    {
        "xindex": -2,
        "yindex": 20
    },
    {
        "xindex": -2,
        "yindex": 21
    },
    {
        "xindex": -2,
        "yindex": 22
    },
    {
        "xindex": -2,
        "yindex": 23
    },
    {
        "xindex": -2,
        "yindex": 24
    },
    {
        "xindex": -2,
        "yindex": 25
    },
    {
        "xindex": -2,
        "yindex": 26
    },
    {
        "xindex": -2,
        "yindex": 27
    },
    {
        "xindex": -2,
        "yindex": 28
    },
    {
        "xindex": -2,
        "yindex": 29
    },
    {
        "xindex": -1,
        "yindex": -29
    },
    {
        "xindex": -1,
        "yindex": -28
    },
    {
        "xindex": -1,
        "yindex": -27
    },
    {
        "xindex": -1,
        "yindex": -26
    },
    {
        "xindex": -1,
        "yindex": -25
    },
    {
        "xindex": -1,
        "yindex": -24
    },
    {
        "xindex": -1,
        "yindex": -23
    },
    {
        "xindex": -1,
        "yindex": -22
    },
    {
        "xindex": -1,
        "yindex": -21
    },
    {
        "xindex": -1,
        "yindex": -20
    },
    {
        "xindex": -1,
        "yindex": -19
    },
    {
        "xindex": -1,
        "yindex": -18
    },
    {
        "xindex": -1,
        "yindex": -17
    },
    {
        "xindex": -1,
        "yindex": -16
    },
    {
        "xindex": -1,
        "yindex": -15
    },
    {
        "xindex": -1,
        "yindex": -14
    },
    {
        "xindex": -1,
        "yindex": -13
    },
    {
        "xindex": -1,
        "yindex": -12
    },
    {
        "xindex": -1,
        "yindex": -11
    },
    {
        "xindex": -1,
        "yindex": -10
    },
    {
        "xindex": -1,
        "yindex": -9
    },
    {
        "xindex": -1,
        "yindex": -8
    },
    {
        "xindex": -1,
        "yindex": -7
    },
    {
        "xindex": -1,
        "yindex": -6
    },
    {
        "xindex": -1,
        "yindex": -5
    },
    {
        "xindex": -1,
        "yindex": -4
    },
    {
        "xindex": -1,
        "yindex": -3
    },
    {
        "xindex": -1,
        "yindex": -2
    },
    {
        "xindex": -1,
        "yindex": -1
    },
    {
        "xindex": -1,
        "yindex": 0
    },
    {
        "xindex": -1,
        "yindex": 1
    },
    {
        "xindex": -1,
        "yindex": 2
    },
    {
        "xindex": -1,
        "yindex": 3
    },
    {
        "xindex": -1,
        "yindex": 4
    },
    {
        "xindex": -1,
        "yindex": 5
    },
    {
        "xindex": -1,
        "yindex": 6
    },
    {
        "xindex": -1,
        "yindex": 7
    },
    {
        "xindex": -1,
        "yindex": 8
    },
    {
        "xindex": -1,
        "yindex": 9
    },
    {
        "xindex": -1,
        "yindex": 10
    },
    {
        "xindex": -1,
        "yindex": 11
    },
    {
        "xindex": -1,
        "yindex": 12
    },
    {
        "xindex": -1,
        "yindex": 13
    },
    {
        "xindex": -1,
        "yindex": 14
    },
    {
        "xindex": -1,
        "yindex": 15
    },
    {
        "xindex": -1,
        "yindex": 16
    },
    {
        "xindex": -1,
        "yindex": 17
    },
    {
        "xindex": -1,
        "yindex": 18
    },
    {
        "xindex": -1,
        "yindex": 19
    },
    {
        "xindex": -1,
        "yindex": 20
    },
    {
        "xindex": -1,
        "yindex": 21
    },
    {
        "xindex": -1,
        "yindex": 22
    },
    {
        "xindex": -1,
        "yindex": 23
    },
    {
        "xindex": -1,
        "yindex": 24
    },
    {
        "xindex": -1,
        "yindex": 25
    },
    {
        "xindex": -1,
        "yindex": 26
    },
    {
        "xindex": -1,
        "yindex": 27
    },
    {
        "xindex": -1,
        "yindex": 28
    },
    {
        "xindex": -1,
        "yindex": 29
    },
    {
        "xindex": 0,
        "yindex": -29
    },
    {
        "xindex": 0,
        "yindex": -28
    },
    {
        "xindex": 0,
        "yindex": -27
    },
    {
        "xindex": 0,
        "yindex": -26
    },
    {
        "xindex": 0,
        "yindex": -25
    },
    {
        "xindex": 0,
        "yindex": -24
    },
    {
        "xindex": 0,
        "yindex": -23
    },
    {
        "xindex": 0,
        "yindex": -22
    },
    {
        "xindex": 0,
        "yindex": -21
    },
    {
        "xindex": 0,
        "yindex": -20
    },
    {
        "xindex": 0,
        "yindex": -19
    },
    {
        "xindex": 0,
        "yindex": -18
    },
    {
        "xindex": 0,
        "yindex": -17
    },
    {
        "xindex": 0,
        "yindex": -16
    },
    {
        "xindex": 0,
        "yindex": -15
    },
    {
        "xindex": 0,
        "yindex": -14
    },
    {
        "xindex": 0,
        "yindex": -13
    },
    {
        "xindex": 0,
        "yindex": -12
    },
    {
        "xindex": 0,
        "yindex": -11
    },
    {
        "xindex": 0,
        "yindex": -10
    },
    {
        "xindex": 0,
        "yindex": -9
    },
    {
        "xindex": 0,
        "yindex": -8
    },
    {
        "xindex": 0,
        "yindex": -7
    },
    {
        "xindex": 0,
        "yindex": -6
    },
    {
        "xindex": 0,
        "yindex": -5
    },
    {
        "xindex": 0,
        "yindex": -4
    },
    {
        "xindex": 0,
        "yindex": -3
    },
    {
        "xindex": 0,
        "yindex": -2
    },
    {
        "xindex": 0,
        "yindex": -1
    },
    {
        "xindex": 0,
        "yindex": 0
    },
    {
        "xindex": 0,
        "yindex": 1
    },
    {
        "xindex": 0,
        "yindex": 2
    },
    {
        "xindex": 0,
        "yindex": 3
    },
    {
        "xindex": 0,
        "yindex": 4
    },
    {
        "xindex": 0,
        "yindex": 5
    },
    {
        "xindex": 0,
        "yindex": 6
    },
    {
        "xindex": 0,
        "yindex": 7
    },
    {
        "xindex": 0,
        "yindex": 8
    },
    {
        "xindex": 0,
        "yindex": 9
    },
    {
        "xindex": 0,
        "yindex": 10
    },
    {
        "xindex": 0,
        "yindex": 11
    },
    {
        "xindex": 0,
        "yindex": 12
    },
    {
        "xindex": 0,
        "yindex": 13
    },
    {
        "xindex": 0,
        "yindex": 14
    },
    {
        "xindex": 0,
        "yindex": 15
    },
    {
        "xindex": 0,
        "yindex": 16
    },
    {
        "xindex": 0,
        "yindex": 17
    },
    {
        "xindex": 0,
        "yindex": 18
    },
    {
        "xindex": 0,
        "yindex": 19
    },
    {
        "xindex": 0,
        "yindex": 20
    },
    {
        "xindex": 0,
        "yindex": 21
    },
    {
        "xindex": 0,
        "yindex": 22
    },
    {
        "xindex": 0,
        "yindex": 23
    },
    {
        "xindex": 0,
        "yindex": 24
    },
    {
        "xindex": 0,
        "yindex": 25
    },
    {
        "xindex": 0,
        "yindex": 26
    },
    {
        "xindex": 0,
        "yindex": 27
    },
    {
        "xindex": 0,
        "yindex": 28
    },
    {
        "xindex": 1,
        "yindex": -29
    },
    {
        "xindex": 1,
        "yindex": -28
    },
    {
        "xindex": 1,
        "yindex": -27
    },
    {
        "xindex": 1,
        "yindex": -26
    },
    {
        "xindex": 1,
        "yindex": -25
    },
    {
        "xindex": 1,
        "yindex": -24
    },
    {
        "xindex": 1,
        "yindex": -23
    },
    {
        "xindex": 1,
        "yindex": -22
    },
    {
        "xindex": 1,
        "yindex": -21
    },
    {
        "xindex": 1,
        "yindex": -20
    },
    {
        "xindex": 1,
        "yindex": -19
    },
    {
        "xindex": 1,
        "yindex": -18
    },
    {
        "xindex": 1,
        "yindex": -17
    },
    {
        "xindex": 1,
        "yindex": -16
    },
    {
        "xindex": 1,
        "yindex": -15
    },
    {
        "xindex": 1,
        "yindex": -14
    },
    {
        "xindex": 1,
        "yindex": -13
    },
    {
        "xindex": 1,
        "yindex": -12
    },
    {
        "xindex": 1,
        "yindex": -11
    },
    {
        "xindex": 1,
        "yindex": -10
    },
    {
        "xindex": 1,
        "yindex": -9
    },
    {
        "xindex": 1,
        "yindex": -8
    },
    {
        "xindex": 1,
        "yindex": -7
    },
    {
        "xindex": 1,
        "yindex": -6
    },
    {
        "xindex": 1,
        "yindex": -5
    },
    {
        "xindex": 1,
        "yindex": -4
    },
    {
        "xindex": 1,
        "yindex": -3
    },
    {
        "xindex": 1,
        "yindex": -2
    },
    {
        "xindex": 1,
        "yindex": -1
    },
    {
        "xindex": 1,
        "yindex": 0
    },
    {
        "xindex": 1,
        "yindex": 1
    },
    {
        "xindex": 1,
        "yindex": 2
    },
    {
        "xindex": 1,
        "yindex": 3
    },
    {
        "xindex": 1,
        "yindex": 4
    },
    {
        "xindex": 1,
        "yindex": 5
    },
    {
        "xindex": 1,
        "yindex": 6
    },
    {
        "xindex": 1,
        "yindex": 7
    },
    {
        "xindex": 1,
        "yindex": 8
    },
    {
        "xindex": 1,
        "yindex": 9
    },
    {
        "xindex": 1,
        "yindex": 10
    },
    {
        "xindex": 1,
        "yindex": 11
    },
    {
        "xindex": 1,
        "yindex": 12
    },
    {
        "xindex": 1,
        "yindex": 13
    },
    {
        "xindex": 1,
        "yindex": 14
    },
    {
        "xindex": 1,
        "yindex": 15
    },
    {
        "xindex": 1,
        "yindex": 16
    },
    {
        "xindex": 1,
        "yindex": 17
    },
    {
        "xindex": 1,
        "yindex": 18
    },
    {
        "xindex": 1,
        "yindex": 19
    },
    {
        "xindex": 1,
        "yindex": 20
    },
    {
        "xindex": 1,
        "yindex": 21
    },
    {
        "xindex": 1,
        "yindex": 22
    },
    {
        "xindex": 1,
        "yindex": 23
    },
    {
        "xindex": 1,
        "yindex": 24
    },
    {
        "xindex": 1,
        "yindex": 25
    },
    {
        "xindex": 1,
        "yindex": 26
    },
    {
        "xindex": 1,
        "yindex": 27
    },
    {
        "xindex": 1,
        "yindex": 28
    },
    {
        "xindex": 2,
        "yindex": -28
    },
    {
        "xindex": 2,
        "yindex": -27
    },
    {
        "xindex": 2,
        "yindex": -26
    },
    {
        "xindex": 2,
        "yindex": -25
    },
    {
        "xindex": 2,
        "yindex": -24
    },
    {
        "xindex": 2,
        "yindex": -23
    },
    {
        "xindex": 2,
        "yindex": -22
    },
    {
        "xindex": 2,
        "yindex": -21
    },
    {
        "xindex": 2,
        "yindex": -20
    },
    {
        "xindex": 2,
        "yindex": -19
    },
    {
        "xindex": 2,
        "yindex": -18
    },
    {
        "xindex": 2,
        "yindex": -17
    },
    {
        "xindex": 2,
        "yindex": -16
    },
    {
        "xindex": 2,
        "yindex": -15
    },
    {
        "xindex": 2,
        "yindex": -14
    },
    {
        "xindex": 2,
        "yindex": -13
    },
    {
        "xindex": 2,
        "yindex": -12
    },
    {
        "xindex": 2,
        "yindex": -11
    },
    {
        "xindex": 2,
        "yindex": -10
    },
    {
        "xindex": 2,
        "yindex": -9
    },
    {
        "xindex": 2,
        "yindex": -8
    },
    {
        "xindex": 2,
        "yindex": -7
    },
    {
        "xindex": 2,
        "yindex": -6
    },
    {
        "xindex": 2,
        "yindex": -5
    },
    {
        "xindex": 2,
        "yindex": -4
    },
    {
        "xindex": 2,
        "yindex": -3
    },
    {
        "xindex": 2,
        "yindex": -2
    },
    {
        "xindex": 2,
        "yindex": -1
    },
    {
        "xindex": 2,
        "yindex": 0
    },
    {
        "xindex": 2,
        "yindex": 1
    },
    {
        "xindex": 2,
        "yindex": 2
    },
    {
        "xindex": 2,
        "yindex": 3
    },
    {
        "xindex": 2,
        "yindex": 4
    },
    {
        "xindex": 2,
        "yindex": 5
    },
    {
        "xindex": 2,
        "yindex": 6
    },
    {
        "xindex": 2,
        "yindex": 7
    },
    {
        "xindex": 2,
        "yindex": 8
    },
    {
        "xindex": 2,
        "yindex": 9
    },
    {
        "xindex": 2,
        "yindex": 10
    },
    {
        "xindex": 2,
        "yindex": 11
    },
    {
        "xindex": 2,
        "yindex": 12
    },
    {
        "xindex": 2,
        "yindex": 13
    },
    {
        "xindex": 2,
        "yindex": 14
    },
    {
        "xindex": 2,
        "yindex": 15
    },
    {
        "xindex": 2,
        "yindex": 16
    },
    {
        "xindex": 2,
        "yindex": 17
    },
    {
        "xindex": 2,
        "yindex": 18
    },
    {
        "xindex": 2,
        "yindex": 19
    },
    {
        "xindex": 2,
        "yindex": 20
    },
    {
        "xindex": 2,
        "yindex": 21
    },
    {
        "xindex": 2,
        "yindex": 22
    },
    {
        "xindex": 2,
        "yindex": 23
    },
    {
        "xindex": 2,
        "yindex": 24
    },
    {
        "xindex": 2,
        "yindex": 25
    },
    {
        "xindex": 2,
        "yindex": 26
    },
    {
        "xindex": 2,
        "yindex": 27
    },
    {
        "xindex": 2,
        "yindex": 28
    },
    {
        "xindex": 3,
        "yindex": -28
    },
    {
        "xindex": 3,
        "yindex": -27
    },
    {
        "xindex": 3,
        "yindex": -26
    },
    {
        "xindex": 3,
        "yindex": -25
    },
    {
        "xindex": 3,
        "yindex": -24
    },
    {
        "xindex": 3,
        "yindex": -23
    },
    {
        "xindex": 3,
        "yindex": -22
    },
    {
        "xindex": 3,
        "yindex": -21
    },
    {
        "xindex": 3,
        "yindex": -20
    },
    {
        "xindex": 3,
        "yindex": -19
    },
    {
        "xindex": 3,
        "yindex": -18
    },
    {
        "xindex": 3,
        "yindex": -17
    },
    {
        "xindex": 3,
        "yindex": -16
    },
    {
        "xindex": 3,
        "yindex": -15
    },
    {
        "xindex": 3,
        "yindex": -14
    },
    {
        "xindex": 3,
        "yindex": -13
    },
    {
        "xindex": 3,
        "yindex": -12
    },
    {
        "xindex": 3,
        "yindex": -11
    },
    {
        "xindex": 3,
        "yindex": -10
    },
    {
        "xindex": 3,
        "yindex": -9
    },
    {
        "xindex": 3,
        "yindex": -8
    },
    {
        "xindex": 3,
        "yindex": -7
    },
    {
        "xindex": 3,
        "yindex": -6
    },
    {
        "xindex": 3,
        "yindex": -5
    },
    {
        "xindex": 3,
        "yindex": -4
    },
    {
        "xindex": 3,
        "yindex": -3
    },
    {
        "xindex": 3,
        "yindex": -2
    },
    {
        "xindex": 3,
        "yindex": -1
    },
    {
        "xindex": 3,
        "yindex": 0
    },
    {
        "xindex": 3,
        "yindex": 1
    },
    {
        "xindex": 3,
        "yindex": 2
    },
    {
        "xindex": 3,
        "yindex": 3
    },
    {
        "xindex": 3,
        "yindex": 4
    },
    {
        "xindex": 3,
        "yindex": 5
    },
    {
        "xindex": 3,
        "yindex": 6
    },
    {
        "xindex": 3,
        "yindex": 7
    },
    {
        "xindex": 3,
        "yindex": 8
    },
    {
        "xindex": 3,
        "yindex": 9
    },
    {
        "xindex": 3,
        "yindex": 10
    },
    {
        "xindex": 3,
        "yindex": 11
    },
    {
        "xindex": 3,
        "yindex": 12
    },
    {
        "xindex": 3,
        "yindex": 13
    },
    {
        "xindex": 3,
        "yindex": 14
    },
    {
        "xindex": 3,
        "yindex": 15
    },
    {
        "xindex": 3,
        "yindex": 16
    },
    {
        "xindex": 3,
        "yindex": 17
    },
    {
        "xindex": 3,
        "yindex": 18
    },
    {
        "xindex": 3,
        "yindex": 19
    },
    {
        "xindex": 3,
        "yindex": 20
    },
    {
        "xindex": 3,
        "yindex": 21
    },
    {
        "xindex": 3,
        "yindex": 22
    },
    {
        "xindex": 3,
        "yindex": 23
    },
    {
        "xindex": 3,
        "yindex": 24
    },
    {
        "xindex": 3,
        "yindex": 25
    },
    {
        "xindex": 3,
        "yindex": 26
    },
    {
        "xindex": 3,
        "yindex": 27
    },
    {
        "xindex": 4,
        "yindex": -27
    },
    {
        "xindex": 4,
        "yindex": -26
    },
    {
        "xindex": 4,
        "yindex": -25
    },
    {
        "xindex": 4,
        "yindex": -24
    },
    {
        "xindex": 4,
        "yindex": -23
    },
    {
        "xindex": 4,
        "yindex": -22
    },
    {
        "xindex": 4,
        "yindex": -21
    },
    {
        "xindex": 4,
        "yindex": -20
    },
    {
        "xindex": 4,
        "yindex": -19
    },
    {
        "xindex": 4,
        "yindex": -18
    },
    {
        "xindex": 4,
        "yindex": -17
    },
    {
        "xindex": 4,
        "yindex": -16
    },
    {
        "xindex": 4,
        "yindex": -15
    },
    {
        "xindex": 4,
        "yindex": -14
    },
    {
        "xindex": 4,
        "yindex": -13
    },
    {
        "xindex": 4,
        "yindex": -12
    },
    {
        "xindex": 4,
        "yindex": -11
    },
    {
        "xindex": 4,
        "yindex": -10
    },
    {
        "xindex": 4,
        "yindex": -9
    },
    {
        "xindex": 4,
        "yindex": -8
    },
    {
        "xindex": 4,
        "yindex": -7
    },
    {
        "xindex": 4,
        "yindex": -6
    },
    {
        "xindex": 4,
        "yindex": -5
    },
    {
        "xindex": 4,
        "yindex": -4
    },
    {
        "xindex": 4,
        "yindex": -3
    },
    {
        "xindex": 4,
        "yindex": -2
    },
    {
        "xindex": 4,
        "yindex": -1
    },
    {
        "xindex": 4,
        "yindex": 0
    },
    {
        "xindex": 4,
        "yindex": 1
    },
    {
        "xindex": 4,
        "yindex": 2
    },
    {
        "xindex": 4,
        "yindex": 3
    },
    {
        "xindex": 4,
        "yindex": 4
    },
    {
        "xindex": 4,
        "yindex": 5
    },
    {
        "xindex": 4,
        "yindex": 6
    },
    {
        "xindex": 4,
        "yindex": 7
    },
    {
        "xindex": 4,
        "yindex": 8
    },
    {
        "xindex": 4,
        "yindex": 9
    },
    {
        "xindex": 4,
        "yindex": 10
    },
    {
        "xindex": 4,
        "yindex": 11
    },
    {
        "xindex": 4,
        "yindex": 12
    },
    {
        "xindex": 4,
        "yindex": 13
    },
    {
        "xindex": 4,
        "yindex": 14
    },
    {
        "xindex": 4,
        "yindex": 15
    },
    {
        "xindex": 4,
        "yindex": 16
    },
    {
        "xindex": 4,
        "yindex": 17
    },
    {
        "xindex": 4,
        "yindex": 18
    },
    {
        "xindex": 4,
        "yindex": 19
    },
    {
        "xindex": 4,
        "yindex": 20
    },
    {
        "xindex": 4,
        "yindex": 21
    },
    {
        "xindex": 4,
        "yindex": 22
    },
    {
        "xindex": 4,
        "yindex": 23
    },
    {
        "xindex": 4,
        "yindex": 24
    },
    {
        "xindex": 4,
        "yindex": 25
    },
    {
        "xindex": 4,
        "yindex": 26
    },
    {
        "xindex": 4,
        "yindex": 27
    },
    {
        "xindex": 5,
        "yindex": -26
    },
    {
        "xindex": 5,
        "yindex": -25
    },
    {
        "xindex": 5,
        "yindex": -24
    },
    {
        "xindex": 5,
        "yindex": -23
    },
    {
        "xindex": 5,
        "yindex": -22
    },
    {
        "xindex": 5,
        "yindex": -21
    },
    {
        "xindex": 5,
        "yindex": -20
    },
    {
        "xindex": 5,
        "yindex": -19
    },
    {
        "xindex": 5,
        "yindex": -18
    },
    {
        "xindex": 5,
        "yindex": -17
    },
    {
        "xindex": 5,
        "yindex": -16
    },
    {
        "xindex": 5,
        "yindex": -15
    },
    {
        "xindex": 5,
        "yindex": -14
    },
    {
        "xindex": 5,
        "yindex": -13
    },
    {
        "xindex": 5,
        "yindex": -12
    },
    {
        "xindex": 5,
        "yindex": -11
    },
    {
        "xindex": 5,
        "yindex": -10
    },
    {
        "xindex": 5,
        "yindex": -9
    },
    {
        "xindex": 5,
        "yindex": -8
    },
    {
        "xindex": 5,
        "yindex": -7
    },
    {
        "xindex": 5,
        "yindex": -6
    },
    {
        "xindex": 5,
        "yindex": -5
    },
    {
        "xindex": 5,
        "yindex": -4
    },
    {
        "xindex": 5,
        "yindex": -3
    },
    {
        "xindex": 5,
        "yindex": -2
    },
    {
        "xindex": 5,
        "yindex": -1
    },
    {
        "xindex": 5,
        "yindex": 0
    },
    {
        "xindex": 5,
        "yindex": 1
    },
    {
        "xindex": 5,
        "yindex": 2
    },
    {
        "xindex": 5,
        "yindex": 3
    },
    {
        "xindex": 5,
        "yindex": 4
    },
    {
        "xindex": 5,
        "yindex": 5
    },
    {
        "xindex": 5,
        "yindex": 6
    },
    {
        "xindex": 5,
        "yindex": 7
    },
    {
        "xindex": 5,
        "yindex": 8
    },
    {
        "xindex": 5,
        "yindex": 9
    },
    {
        "xindex": 5,
        "yindex": 10
    },
    {
        "xindex": 5,
        "yindex": 11
    },
    {
        "xindex": 5,
        "yindex": 12
    },
    {
        "xindex": 5,
        "yindex": 13
    },
    {
        "xindex": 5,
        "yindex": 14
    },
    {
        "xindex": 5,
        "yindex": 15
    },
    {
        "xindex": 5,
        "yindex": 16
    },
    {
        "xindex": 5,
        "yindex": 17
    },
    {
        "xindex": 5,
        "yindex": 18
    },
    {
        "xindex": 5,
        "yindex": 19
    },
    {
        "xindex": 5,
        "yindex": 20
    },
    {
        "xindex": 5,
        "yindex": 21
    },
    {
        "xindex": 5,
        "yindex": 22
    },
    {
        "xindex": 5,
        "yindex": 23
    },
    {
        "xindex": 5,
        "yindex": 24
    },
    {
        "xindex": 5,
        "yindex": 25
    },
    {
        "xindex": 5,
        "yindex": 26
    },
    {
        "xindex": 6,
        "yindex": -26
    },
    {
        "xindex": 6,
        "yindex": -25
    },
    {
        "xindex": 6,
        "yindex": -24
    },
    {
        "xindex": 6,
        "yindex": -23
    },
    {
        "xindex": 6,
        "yindex": -22
    },
    {
        "xindex": 6,
        "yindex": -21
    },
    {
        "xindex": 6,
        "yindex": -20
    },
    {
        "xindex": 6,
        "yindex": -19
    },
    {
        "xindex": 6,
        "yindex": -18
    },
    {
        "xindex": 6,
        "yindex": -17
    },
    {
        "xindex": 6,
        "yindex": -16
    },
    {
        "xindex": 6,
        "yindex": -15
    },
    {
        "xindex": 6,
        "yindex": -14
    },
    {
        "xindex": 6,
        "yindex": -13
    },
    {
        "xindex": 6,
        "yindex": -12
    },
    {
        "xindex": 6,
        "yindex": -11
    },
    {
        "xindex": 6,
        "yindex": -10
    },
    {
        "xindex": 6,
        "yindex": -9
    },
    {
        "xindex": 6,
        "yindex": -8
    },
    {
        "xindex": 6,
        "yindex": -7
    },
    {
        "xindex": 6,
        "yindex": -6
    },
    {
        "xindex": 6,
        "yindex": -5
    },
    {
        "xindex": 6,
        "yindex": -4
    },
    {
        "xindex": 6,
        "yindex": -3
    },
    {
        "xindex": 6,
        "yindex": -2
    },
    {
        "xindex": 6,
        "yindex": -1
    },
    {
        "xindex": 6,
        "yindex": 0
    },
    {
        "xindex": 6,
        "yindex": 1
    },
    {
        "xindex": 6,
        "yindex": 2
    },
    {
        "xindex": 6,
        "yindex": 3
    },
    {
        "xindex": 6,
        "yindex": 4
    },
    {
        "xindex": 6,
        "yindex": 5
    },
    {
        "xindex": 6,
        "yindex": 6
    },
    {
        "xindex": 6,
        "yindex": 7
    },
    {
        "xindex": 6,
        "yindex": 8
    },
    {
        "xindex": 6,
        "yindex": 9
    },
    {
        "xindex": 6,
        "yindex": 10
    },
    {
        "xindex": 6,
        "yindex": 11
    },
    {
        "xindex": 6,
        "yindex": 12
    },
    {
        "xindex": 6,
        "yindex": 13
    },
    {
        "xindex": 6,
        "yindex": 14
    },
    {
        "xindex": 6,
        "yindex": 15
    },
    {
        "xindex": 6,
        "yindex": 16
    },
    {
        "xindex": 6,
        "yindex": 17
    },
    {
        "xindex": 6,
        "yindex": 18
    },
    {
        "xindex": 6,
        "yindex": 19
    },
    {
        "xindex": 6,
        "yindex": 20
    },
    {
        "xindex": 6,
        "yindex": 21
    },
    {
        "xindex": 6,
        "yindex": 22
    },
    {
        "xindex": 6,
        "yindex": 23
    },
    {
        "xindex": 6,
        "yindex": 24
    },
    {
        "xindex": 6,
        "yindex": 25
    },
    {
        "xindex": 7,
        "yindex": -24
    },
    {
        "xindex": 7,
        "yindex": -23
    },
    {
        "xindex": 7,
        "yindex": -22
    },
    {
        "xindex": 7,
        "yindex": -21
    },
    {
        "xindex": 7,
        "yindex": -20
    },
    {
        "xindex": 7,
        "yindex": -19
    },
    {
        "xindex": 7,
        "yindex": -18
    },
    {
        "xindex": 7,
        "yindex": -17
    },
    {
        "xindex": 7,
        "yindex": -16
    },
    {
        "xindex": 7,
        "yindex": -15
    },
    {
        "xindex": 7,
        "yindex": -14
    },
    {
        "xindex": 7,
        "yindex": -13
    },
    {
        "xindex": 7,
        "yindex": -12
    },
    {
        "xindex": 7,
        "yindex": -11
    },
    {
        "xindex": 7,
        "yindex": -10
    },
    {
        "xindex": 7,
        "yindex": -9
    },
    {
        "xindex": 7,
        "yindex": -8
    },
    {
        "xindex": 7,
        "yindex": -7
    },
    {
        "xindex": 7,
        "yindex": -6
    },
    {
        "xindex": 7,
        "yindex": -5
    },
    {
        "xindex": 7,
        "yindex": -4
    },
    {
        "xindex": 7,
        "yindex": -3
    },
    {
        "xindex": 7,
        "yindex": -2
    },
    {
        "xindex": 7,
        "yindex": -1
    },
    {
        "xindex": 7,
        "yindex": 0
    },
    {
        "xindex": 7,
        "yindex": 1
    },
    {
        "xindex": 7,
        "yindex": 2
    },
    {
        "xindex": 7,
        "yindex": 3
    },
    {
        "xindex": 7,
        "yindex": 4
    },
    {
        "xindex": 7,
        "yindex": 5
    },
    {
        "xindex": 7,
        "yindex": 6
    },
    {
        "xindex": 7,
        "yindex": 7
    },
    {
        "xindex": 7,
        "yindex": 8
    },
    {
        "xindex": 7,
        "yindex": 9
    },
    {
        "xindex": 7,
        "yindex": 10
    },
    {
        "xindex": 7,
        "yindex": 11
    },
    {
        "xindex": 7,
        "yindex": 12
    },
    {
        "xindex": 7,
        "yindex": 13
    },
    {
        "xindex": 7,
        "yindex": 14
    },
    {
        "xindex": 7,
        "yindex": 15
    },
    {
        "xindex": 7,
        "yindex": 16
    },
    {
        "xindex": 7,
        "yindex": 17
    },
    {
        "xindex": 7,
        "yindex": 18
    },
    {
        "xindex": 7,
        "yindex": 19
    },
    {
        "xindex": 7,
        "yindex": 20
    },
    {
        "xindex": 7,
        "yindex": 21
    },
    {
        "xindex": 7,
        "yindex": 22
    },
    {
        "xindex": 7,
        "yindex": 23
    },
    {
        "xindex": 7,
        "yindex": 24
    },
    {
        "xindex": 8,
        "yindex": -23
    },
    {
        "xindex": 8,
        "yindex": -22
    },
    {
        "xindex": 8,
        "yindex": -21
    },
    {
        "xindex": 8,
        "yindex": -20
    },
    {
        "xindex": 8,
        "yindex": -19
    },
    {
        "xindex": 8,
        "yindex": -18
    },
    {
        "xindex": 8,
        "yindex": -17
    },
    {
        "xindex": 8,
        "yindex": -16
    },
    {
        "xindex": 8,
        "yindex": -15
    },
    {
        "xindex": 8,
        "yindex": -14
    },
    {
        "xindex": 8,
        "yindex": -13
    },
    {
        "xindex": 8,
        "yindex": -12
    },
    {
        "xindex": 8,
        "yindex": -11
    },
    {
        "xindex": 8,
        "yindex": -10
    },
    {
        "xindex": 8,
        "yindex": -9
    },
    {
        "xindex": 8,
        "yindex": -8
    },
    {
        "xindex": 8,
        "yindex": -7
    },
    {
        "xindex": 8,
        "yindex": -6
    },
    {
        "xindex": 8,
        "yindex": -5
    },
    {
        "xindex": 8,
        "yindex": -4
    },
    {
        "xindex": 8,
        "yindex": -3
    },
    {
        "xindex": 8,
        "yindex": -2
    },
    {
        "xindex": 8,
        "yindex": -1
    },
    {
        "xindex": 8,
        "yindex": 0
    },
    {
        "xindex": 8,
        "yindex": 1
    },
    {
        "xindex": 8,
        "yindex": 2
    },
    {
        "xindex": 8,
        "yindex": 3
    },
    {
        "xindex": 8,
        "yindex": 4
    },
    {
        "xindex": 8,
        "yindex": 5
    },
    {
        "xindex": 8,
        "yindex": 6
    },
    {
        "xindex": 8,
        "yindex": 7
    },
    {
        "xindex": 8,
        "yindex": 8
    },
    {
        "xindex": 8,
        "yindex": 9
    },
    {
        "xindex": 8,
        "yindex": 10
    },
    {
        "xindex": 8,
        "yindex": 11
    },
    {
        "xindex": 8,
        "yindex": 12
    },
    {
        "xindex": 8,
        "yindex": 13
    },
    {
        "xindex": 8,
        "yindex": 14
    },
    {
        "xindex": 8,
        "yindex": 15
    },
    {
        "xindex": 8,
        "yindex": 16
    },
    {
        "xindex": 8,
        "yindex": 17
    },
    {
        "xindex": 8,
        "yindex": 18
    },
    {
        "xindex": 8,
        "yindex": 19
    },
    {
        "xindex": 8,
        "yindex": 20
    },
    {
        "xindex": 8,
        "yindex": 21
    },
    {
        "xindex": 8,
        "yindex": 22
    },
    {
        "xindex": 8,
        "yindex": 23
    },
    {
        "xindex": 9,
        "yindex": -22
    },
    {
        "xindex": 9,
        "yindex": -21
    },
    {
        "xindex": 9,
        "yindex": -20
    },
    {
        "xindex": 9,
        "yindex": -19
    },
    {
        "xindex": 9,
        "yindex": -18
    },
    {
        "xindex": 9,
        "yindex": -17
    },
    {
        "xindex": 9,
        "yindex": -16
    },
    {
        "xindex": 9,
        "yindex": -15
    },
    {
        "xindex": 9,
        "yindex": -14
    },
    {
        "xindex": 9,
        "yindex": -13
    },
    {
        "xindex": 9,
        "yindex": -12
    },
    {
        "xindex": 9,
        "yindex": -11
    },
    {
        "xindex": 9,
        "yindex": -10
    },
    {
        "xindex": 9,
        "yindex": -9
    },
    {
        "xindex": 9,
        "yindex": -8
    },
    {
        "xindex": 9,
        "yindex": -7
    },
    {
        "xindex": 9,
        "yindex": -6
    },
    {
        "xindex": 9,
        "yindex": -5
    },
    {
        "xindex": 9,
        "yindex": -4
    },
    {
        "xindex": 9,
        "yindex": -3
    },
    {
        "xindex": 9,
        "yindex": -2
    },
    {
        "xindex": 9,
        "yindex": -1
    },
    {
        "xindex": 9,
        "yindex": 0
    },
    {
        "xindex": 9,
        "yindex": 1
    },
    {
        "xindex": 9,
        "yindex": 2
    },
    {
        "xindex": 9,
        "yindex": 3
    },
    {
        "xindex": 9,
        "yindex": 4
    },
    {
        "xindex": 9,
        "yindex": 5
    },
    {
        "xindex": 9,
        "yindex": 6
    },
    {
        "xindex": 9,
        "yindex": 7
    },
    {
        "xindex": 9,
        "yindex": 8
    },
    {
        "xindex": 9,
        "yindex": 9
    },
    {
        "xindex": 9,
        "yindex": 10
    },
    {
        "xindex": 9,
        "yindex": 11
    },
    {
        "xindex": 9,
        "yindex": 12
    },
    {
        "xindex": 9,
        "yindex": 13
    },
    {
        "xindex": 9,
        "yindex": 14
    },
    {
        "xindex": 9,
        "yindex": 15
    },
    {
        "xindex": 9,
        "yindex": 16
    },
    {
        "xindex": 9,
        "yindex": 17
    },
    {
        "xindex": 9,
        "yindex": 18
    },
    {
        "xindex": 9,
        "yindex": 19
    },
    {
        "xindex": 9,
        "yindex": 20
    },
    {
        "xindex": 9,
        "yindex": 21
    },
    {
        "xindex": 10,
        "yindex": -20
    },
    {
        "xindex": 10,
        "yindex": -19
    },
    {
        "xindex": 10,
        "yindex": -18
    },
    {
        "xindex": 10,
        "yindex": -17
    },
    {
        "xindex": 10,
        "yindex": -16
    },
    {
        "xindex": 10,
        "yindex": -15
    },
    {
        "xindex": 10,
        "yindex": -14
    },
    {
        "xindex": 10,
        "yindex": -13
    },
    {
        "xindex": 10,
        "yindex": -12
    },
    {
        "xindex": 10,
        "yindex": -11
    },
    {
        "xindex": 10,
        "yindex": -10
    },
    {
        "xindex": 10,
        "yindex": -9
    },
    {
        "xindex": 10,
        "yindex": -8
    },
    {
        "xindex": 10,
        "yindex": -7
    },
    {
        "xindex": 10,
        "yindex": -6
    },
    {
        "xindex": 10,
        "yindex": -5
    },
    {
        "xindex": 10,
        "yindex": -4
    },
    {
        "xindex": 10,
        "yindex": -3
    },
    {
        "xindex": 10,
        "yindex": -2
    },
    {
        "xindex": 10,
        "yindex": -1
    },
    {
        "xindex": 10,
        "yindex": 0
    },
    {
        "xindex": 10,
        "yindex": 1
    },
    {
        "xindex": 10,
        "yindex": 2
    },
    {
        "xindex": 10,
        "yindex": 3
    },
    {
        "xindex": 10,
        "yindex": 4
    },
    {
        "xindex": 10,
        "yindex": 5
    },
    {
        "xindex": 10,
        "yindex": 6
    },
    {
        "xindex": 10,
        "yindex": 7
    },
    {
        "xindex": 10,
        "yindex": 8
    },
    {
        "xindex": 10,
        "yindex": 9
    },
    {
        "xindex": 10,
        "yindex": 10
    },
    {
        "xindex": 10,
        "yindex": 11
    },
    {
        "xindex": 10,
        "yindex": 12
    },
    {
        "xindex": 10,
        "yindex": 13
    },
    {
        "xindex": 10,
        "yindex": 14
    },
    {
        "xindex": 10,
        "yindex": 15
    },
    {
        "xindex": 10,
        "yindex": 16
    },
    {
        "xindex": 10,
        "yindex": 17
    },
    {
        "xindex": 10,
        "yindex": 18
    },
    {
        "xindex": 10,
        "yindex": 19
    },
    {
        "xindex": 10,
        "yindex": 20
    },
    {
        "xindex": 11,
        "yindex": -18
    },
    {
        "xindex": 11,
        "yindex": -17
    },
    {
        "xindex": 11,
        "yindex": -16
    },
    {
        "xindex": 11,
        "yindex": -15
    },
    {
        "xindex": 11,
        "yindex": -14
    },
    {
        "xindex": 11,
        "yindex": -13
    },
    {
        "xindex": 11,
        "yindex": -12
    },
    {
        "xindex": 11,
        "yindex": -11
    },
    {
        "xindex": 11,
        "yindex": -10
    },
    {
        "xindex": 11,
        "yindex": -9
    },
    {
        "xindex": 11,
        "yindex": -8
    },
    {
        "xindex": 11,
        "yindex": -7
    },
    {
        "xindex": 11,
        "yindex": -6
    },
    {
        "xindex": 11,
        "yindex": -5
    },
    {
        "xindex": 11,
        "yindex": -4
    },
    {
        "xindex": 11,
        "yindex": -3
    },
    {
        "xindex": 11,
        "yindex": -2
    },
    {
        "xindex": 11,
        "yindex": -1
    },
    {
        "xindex": 11,
        "yindex": 0
    },
    {
        "xindex": 11,
        "yindex": 1
    },
    {
        "xindex": 11,
        "yindex": 2
    },
    {
        "xindex": 11,
        "yindex": 3
    },
    {
        "xindex": 11,
        "yindex": 4
    },
    {
        "xindex": 11,
        "yindex": 5
    },
    {
        "xindex": 11,
        "yindex": 6
    },
    {
        "xindex": 11,
        "yindex": 7
    },
    {
        "xindex": 11,
        "yindex": 8
    },
    {
        "xindex": 11,
        "yindex": 9
    },
    {
        "xindex": 11,
        "yindex": 10
    },
    {
        "xindex": 11,
        "yindex": 11
    },
    {
        "xindex": 11,
        "yindex": 12
    },
    {
        "xindex": 11,
        "yindex": 13
    },
    {
        "xindex": 11,
        "yindex": 14
    },
    {
        "xindex": 11,
        "yindex": 15
    },
    {
        "xindex": 11,
        "yindex": 16
    },
    {
        "xindex": 11,
        "yindex": 17
    },
    {
        "xindex": 11,
        "yindex": 18
    },
    {
        "xindex": 12,
        "yindex": -16
    },
    {
        "xindex": 12,
        "yindex": -15
    },
    {
        "xindex": 12,
        "yindex": -14
    },
    {
        "xindex": 12,
        "yindex": -13
    },
    {
        "xindex": 12,
        "yindex": -12
    },
    {
        "xindex": 12,
        "yindex": -11
    },
    {
        "xindex": 12,
        "yindex": -10
    },
    {
        "xindex": 12,
        "yindex": -9
    },
    {
        "xindex": 12,
        "yindex": -8
    },
    {
        "xindex": 12,
        "yindex": -7
    },
    {
        "xindex": 12,
        "yindex": -6
    },
    {
        "xindex": 12,
        "yindex": -5
    },
    {
        "xindex": 12,
        "yindex": -4
    },
    {
        "xindex": 12,
        "yindex": -3
    },
    {
        "xindex": 12,
        "yindex": -2
    },
    {
        "xindex": 12,
        "yindex": -1
    },
    {
        "xindex": 12,
        "yindex": 0
    },
    {
        "xindex": 12,
        "yindex": 1
    },
    {
        "xindex": 12,
        "yindex": 2
    },
    {
        "xindex": 12,
        "yindex": 3
    },
    {
        "xindex": 12,
        "yindex": 4
    },
    {
        "xindex": 12,
        "yindex": 5
    },
    {
        "xindex": 12,
        "yindex": 6
    },
    {
        "xindex": 12,
        "yindex": 7
    },
    {
        "xindex": 12,
        "yindex": 8
    },
    {
        "xindex": 12,
        "yindex": 9
    },
    {
        "xindex": 12,
        "yindex": 10
    },
    {
        "xindex": 12,
        "yindex": 11
    },
    {
        "xindex": 12,
        "yindex": 12
    },
    {
        "xindex": 12,
        "yindex": 13
    },
    {
        "xindex": 12,
        "yindex": 14
    },
    {
        "xindex": 12,
        "yindex": 15
    },
    {
        "xindex": 13,
        "yindex": -13
    },
    {
        "xindex": 13,
        "yindex": -12
    },
    {
        "xindex": 13,
        "yindex": -11
    },
    {
        "xindex": 13,
        "yindex": -10
    },
    {
        "xindex": 13,
        "yindex": -9
    },
    {
        "xindex": 13,
        "yindex": -8
    },
    {
        "xindex": 13,
        "yindex": -7
    },
    {
        "xindex": 13,
        "yindex": -6
    },
    {
        "xindex": 13,
        "yindex": -5
    },
    {
        "xindex": 13,
        "yindex": -4
    },
    {
        "xindex": 13,
        "yindex": -3
    },
    {
        "xindex": 13,
        "yindex": -2
    },
    {
        "xindex": 13,
        "yindex": -1
    },
    {
        "xindex": 13,
        "yindex": 0
    },
    {
        "xindex": 13,
        "yindex": 1
    },
    {
        "xindex": 13,
        "yindex": 2
    },
    {
        "xindex": 13,
        "yindex": 3
    },
    {
        "xindex": 13,
        "yindex": 4
    },
    {
        "xindex": 13,
        "yindex": 5
    },
    {
        "xindex": 13,
        "yindex": 6
    },
    {
        "xindex": 13,
        "yindex": 7
    },
    {
        "xindex": 13,
        "yindex": 8
    },
    {
        "xindex": 13,
        "yindex": 9
    },
    {
        "xindex": 13,
        "yindex": 10
    },
    {
        "xindex": 13,
        "yindex": 11
    },
    {
        "xindex": 13,
        "yindex": 12
    },
    {
        "xindex": 14,
        "yindex": -9
    },
    {
        "xindex": 14,
        "yindex": -8
    },
    {
        "xindex": 14,
        "yindex": -7
    },
    {
        "xindex": 14,
        "yindex": -6
    },
    {
        "xindex": 14,
        "yindex": -5
    },
    {
        "xindex": 14,
        "yindex": -4
    },
    {
        "xindex": 14,
        "yindex": -3
    },
    {
        "xindex": 14,
        "yindex": -2
    },
    {
        "xindex": 14,
        "yindex": -1
    },
    {
        "xindex": 14,
        "yindex": 0
    },
    {
        "xindex": 14,
        "yindex": 1
    },
    {
        "xindex": 14,
        "yindex": 2
    },
    {
        "xindex": 14,
        "yindex": 3
    },
    {
        "xindex": 14,
        "yindex": 4
    },
    {
        "xindex": 14,
        "yindex": 5
    },
    {
        "xindex": 14,
        "yindex": 6
    },
    {
        "xindex": 14,
        "yindex": 7
    },
    {
        "xindex": 14,
        "yindex": 8
    }
];

// JSON 데이터
export const waferInspectionsData: WaferInspectionsData = {
  "waferInspections": [
      {
          "fileVersion": "1 7",
          "fileTimestamp": "03-10-2024 16:23:25",
          "inspectionStationID": [
              "SAMSUNG",
              "Defect-IM",
              "SPINNER"
          ],
          "sampleType": "WAFER",
          "resultTimestamp": "03-10-2024 16:23:25",
          "lotID": "LP22024100315_PJ2@89654577",
          "sampleSize": [
              1,
              300
          ],
          "setupID": [
              "\"\"",
              "03-10-2024",
              "16:23:25"
          ],
          "stepID": "0TT_EWIM_NO_CHHP",
          "coatorID": 619,
          "spinName": null,
          "sampleOrientationMarkType": "NOTCH",
          "orientationMarkLocation": "DOWN",
          "diePitch": [
              8639.48,
              4986.74
          ],
          "shotComposition": [
              3,
              6
          ],
          "dieOrigin": [
              -12929.14,
              1015.01
          ],
          "waferID": "18",
          "slot": 18,
          "sampleCenterLocation": [
              -12929.14,
              1015.01
          ],
          "inspectionTest": 1,
          "sampleTestPlan": 1543,
          "dieLocations": null,
          "defectRecordSpec": [
              {
                  "defectID": 1,
                  "defectArea": 174,
                  "gdsX": 1357.8,
                  "gdsY": 5010.0,
                  "grayMin": 13.0,
                  "grayMax": 75.0,
                  "grayMean": 42.5,
                  "alg": 1,
                  "radius": 112350.1,
                  "select": 1,
                  "yrel": 1438.6,
                  "xsize": 36,
                  "xrel": 1099.5,
                  "ysize": 22,
                  "xindex": -13,
                  "yindex": -11
              },
              {
                  "defectID": 2,
                  "defectArea": 50,
                  "gdsX": 3428.1,
                  "gdsY": 6739.8,
                  "grayMin": 18.0,
                  "grayMax": 50.0,
                  "grayMean": 29.2,
                  "alg": 1,
                  "radius": 127973.1,
                  "select": 1,
                  "yrel": 3154.7,
                  "xsize": 14,
                  "xrel": 2177.7,
                  "ysize": 10,
                  "xindex": -3,
                  "yindex": -26
              },
              {
                  "defectID": 3,
                  "defectArea": 34,
                  "gdsX": 603.2,
                  "gdsY": 3149.0,
                  "grayMin": 25.0,
                  "grayMax": 71.0,
                  "grayMean": 48.8,
                  "alg": 1,
                  "radius": 132392.8,
                  "select": 1,
                  "yrel": 277.5,
                  "xsize": 7,
                  "xrel": 3779.1,
                  "ysize": 7,
                  "xindex": -17,
                  "yindex": 5
              },
              {
                  "defectID": 4,
                  "defectArea": 27,
                  "gdsX": 1733.3,
                  "gdsY": 6553.4,
                  "grayMin": 20.0,
                  "grayMax": 60.0,
                  "grayMean": 42.7,
                  "alg": 1,
                  "radius": 145279.9,
                  "select": 1,
                  "yrel": 1056.4,
                  "xsize": 6,
                  "xrel": 8328.3,
                  "ysize": 6,
                  "xindex": -12,
                  "yindex": -24
              },
              {
                  "defectID": 5,
                  "defectArea": 26,
                  "gdsX": 1836.3,
                  "gdsY": 3489.9,
                  "grayMin": 23.0,
                  "grayMax": 72.0,
                  "grayMean": 48.4,
                  "alg": 1,
                  "radius": 78677.7,
                  "select": 1,
                  "yrel": 836.6,
                  "xsize": 6,
                  "xrel": 4039.5,
                  "ysize": 5,
                  "xindex": -11,
                  "yindex": 2
              },
              {
                  "defectID": 6,
                  "defectArea": 24,
                  "gdsX": 6109.1,
                  "gdsY": 4897.8,
                  "grayMin": 21.0,
                  "grayMax": 68.0,
                  "grayMean": 39.1,
                  "alg": 1,
                  "radius": 113872.2,
                  "select": 1,
                  "yrel": 1193.4,
                  "xsize": 7,
                  "xrel": 3135.2,
                  "ysize": 6,
                  "xindex": 10,
                  "yindex": -10
              },
              {
                  "defectID": 7,
                  "defectArea": 21,
                  "gdsX": 2000.9,
                  "gdsY": 3918.2,
                  "grayMin": 23.0,
                  "grayMax": 57.0,
                  "grayMean": 39.9,
                  "alg": 1,
                  "radius": 71596.3,
                  "select": 1,
                  "yrel": 2687.6,
                  "xsize": 5,
                  "xrel": 2352.2,
                  "ysize": 8,
                  "xindex": -10,
                  "yindex": -2
              },
              {
                  "defectID": 8,
                  "defectArea": 20,
                  "gdsX": 5095.4,
                  "gdsY": 6379.3,
                  "grayMin": 32.0,
                  "grayMax": 58.0,
                  "grayMean": 43.4,
                  "alg": 1,
                  "radius": 127134.8,
                  "select": 1,
                  "yrel": 3427.3,
                  "xsize": 4,
                  "xrel": 3504.5,
                  "ysize": 6,
                  "xindex": 5,
                  "yindex": -23
              },
              {
                  "defectID": 9,
                  "defectArea": 19,
                  "gdsX": 3670.2,
                  "gdsY": 485.5,
                  "grayMin": 29.0,
                  "grayMax": 46.0,
                  "grayMean": 39.2,
                  "alg": 1,
                  "radius": 136730.4,
                  "select": 1,
                  "yrel": 3102.2,
                  "xsize": 5,
                  "xrel": 3766.6,
                  "ysize": 6,
                  "xindex": -2,
                  "yindex": 27
              },
              {
                  "defectID": 10,
                  "defectArea": 14,
                  "gdsX": 6919.0,
                  "gdsY": 2457.6,
                  "grayMin": 26.0,
                  "grayMax": 72.0,
                  "grayMean": 47.1,
                  "alg": 1,
                  "radius": 146742.1,
                  "select": 1,
                  "yrel": 4554.9,
                  "xsize": 4,
                  "xrel": 2796.3,
                  "ysize": 6,
                  "xindex": 14,
                  "yindex": 10
              }
          ],
          "summarySpec": {
              "testNo": 0,
              "defDensity": 0.001,
              "ndie": 1543,
              "ndefect": 10,
              "ndefDie": 12
          },
          "defectCnt": 10,
          "defectDieCnt": 10
      },
      {
          "fileVersion": "1 7",
          "fileTimestamp": "03-10-2024 16:13:37",
          "inspectionStationID": [
              "SAMSUNG",
              "Defect-IM",
              "SPINNER"
          ],
          "sampleType": "WAFER",
          "resultTimestamp": "03-10-2024 16:13:37",
          "lotID": "LP22024100315_PJ2@89654577",
          "sampleSize": [
              1,
              300
          ],
          "setupID": [
              "\"\"",
              "03-10-2024",
              "16:13:37"
          ],
          "stepID": "0TT_EWIM_NO_CHHP",
          "coatorID": 619,
          "spinName": null,
          "sampleOrientationMarkType": "NOTCH",
          "orientationMarkLocation": "DOWN",
          "diePitch": [
              8639.48,
              4986.74
          ],
          "shotComposition": [
              3,
              6
          ],
          "dieOrigin": [
              -12929.14,
              1015.01
          ],
          "waferID": "18",
          "slot": 18,
          "sampleCenterLocation": [
              -12929.14,
              1015.01
          ],
          "inspectionTest": 1,
          "sampleTestPlan": 1543,
          "dieLocations": null,
          "defectRecordSpec": [
              {
                  "defectID": 1,
                  "defectArea": 209,
                  "gdsX": 1346.3,
                  "gdsY": 5082.6,
                  "grayMin": 16.0,
                  "grayMax": 58.0,
                  "grayMean": 35.4,
                  "alg": 1,
                  "radius": 112301.2,
                  "select": 1,
                  "yrel": 2108.6,
                  "xsize": 33,
                  "xrel": 787.1,
                  "ysize": 20,
                  "xindex": -13,
                  "yindex": -11
              },
              {
                  "defectID": 2,
                  "defectArea": 59,
                  "gdsX": 601.0,
                  "gdsY": 3218.0,
                  "grayMin": 17.0,
                  "grayMax": 53.0,
                  "grayMean": 34.0,
                  "alg": 1,
                  "radius": 132484.2,
                  "select": 1,
                  "yrel": 1118.6,
                  "xsize": 11,
                  "xrel": 3845.1,
                  "ysize": 9,
                  "xindex": -17,
                  "yindex": 5
              },
              {
                  "defectID": 3,
                  "defectArea": 19,
                  "gdsX": 6921.3,
                  "gdsY": 2566.4,
                  "grayMin": 25.0,
                  "grayMax": 38.0,
                  "grayMean": 32.1,
                  "alg": 1,
                  "radius": 146741.7,
                  "select": 1,
                  "yrel": 3719.9,
                  "xsize": 6,
                  "xrel": 3119.2,
                  "ysize": 5,
                  "xindex": 14,
                  "yindex": 10
              },
              {
                  "defectID": 4,
                  "defectArea": 17,
                  "gdsX": 1714.4,
                  "gdsY": 6629.5,
                  "grayMin": 25.0,
                  "grayMax": 35.0,
                  "grayMean": 31.2,
                  "alg": 1,
                  "radius": 145222.5,
                  "select": 1,
                  "yrel": 1562.1,
                  "xsize": 5,
                  "xrel": 7699.4,
                  "ysize": 4,
                  "xindex": -12,
                  "yindex": -24
              },
              {
                  "defectID": 5,
                  "defectArea": 15,
                  "gdsX": 6099.5,
                  "gdsY": 5001.3,
                  "grayMin": 25.0,
                  "grayMax": 34.0,
                  "grayMean": 29.7,
                  "alg": 1,
                  "radius": 113980.8,
                  "select": 1,
                  "yrel": 558.1,
                  "xsize": 6,
                  "xrel": 2945.8,
                  "ysize": 4,
                  "xindex": 10,
                  "yindex": -10
              },
              {
                  "defectID": 6,
                  "defectArea": 14,
                  "gdsX": 3405.4,
                  "gdsY": 6825.8,
                  "grayMin": 25.0,
                  "grayMax": 31.0,
                  "grayMean": 28.7,
                  "alg": 1,
                  "radius": 127953.6,
                  "select": 1,
                  "yrel": 3241.8,
                  "xsize": 7,
                  "xrel": 1409.0,
                  "ysize": 4,
                  "xindex": -3,
                  "yindex": -26
              }
          ],
          "summarySpec": {
              "testNo": 0,
              "defDensity": 0.001,
              "ndie": 1543,
              "ndefect": 6,
              "ndefDie": 7
          },
          "defectCnt": 6,
          "defectDieCnt": 6
      },
      {
          "fileVersion": "1 7",
          "fileTimestamp": "03-10-2024 16:35:13",
          "inspectionStationID": [
              "SAMSUNG",
              "Defect-IM",
              "SPINNER"
          ],
          "sampleType": "WAFER",
          "resultTimestamp": "03-10-2024 16:35:13",
          "lotID": "LP22024100315_PJ2@89654577",
          "sampleSize": [
              1,
              300
          ],
          "setupID": [
              "\"\"",
              "03-10-2024",
              "16:35:13"
          ],
          "stepID": "0TT_EWIM_NO_CHHP",
          "coatorID": 619,
          "spinName": null,
          "sampleOrientationMarkType": "NOTCH",
          "orientationMarkLocation": "DOWN",
          "diePitch": [
              8639.48,
              4986.74
          ],
          "shotComposition": [
              3,
              6
          ],
          "dieOrigin": [
              -12929.14,
              1015.01
          ],
          "waferID": "18",
          "slot": 18,
          "sampleCenterLocation": [
              -12929.14,
              1015.01
          ],
          "inspectionTest": 1,
          "sampleTestPlan": 1543,
          "dieLocations": null,
          "defectRecordSpec": [
              {
                  "defectID": 1,
                  "defectArea": 179,
                  "gdsX": 1346.2,
                  "gdsY": 5048.7,
                  "grayMin": 12.0,
                  "grayMax": 90.0,
                  "grayMean": 49.2,
                  "alg": 1,
                  "radius": 112348.9,
                  "select": 1,
                  "yrel": 1772.8,
                  "xsize": 38,
                  "xrel": 916.5,
                  "ysize": 23,
                  "xindex": -13,
                  "yindex": -11
              },
              {
                  "defectID": 2,
                  "defectArea": 77,
                  "gdsX": 3415.8,
                  "gdsY": 6787.1,
                  "grayMin": 16.0,
                  "grayMax": 61.0,
                  "grayMean": 29.8,
                  "alg": 1,
                  "radius": 128036.1,
                  "select": 1,
                  "yrel": 3107.8,
                  "xsize": 17,
                  "xrel": 1986.7,
                  "ysize": 12,
                  "xindex": -3,
                  "yindex": -26
              },
              {
                  "defectID": 3,
                  "defectArea": 62,
                  "gdsX": 3408.1,
                  "gdsY": 6792.0,
                  "grayMin": 7.0,
                  "grayMax": 41.0,
                  "grayMean": 25.6,
                  "alg": 1,
                  "radius": 128273.3,
                  "select": 1,
                  "yrel": 2898.3,
                  "xsize": 20,
                  "xrel": 1659.3,
                  "ysize": 11,
                  "xindex": -3,
                  "yindex": -26
              },
              {
                  "defectID": 4,
                  "defectArea": 50,
                  "gdsX": 595.5,
                  "gdsY": 3185.5,
                  "grayMin": 12.0,
                  "grayMax": 91.0,
                  "grayMean": 55.3,
                  "alg": 1,
                  "radius": 132502.3,
                  "select": 1,
                  "yrel": 721.2,
                  "xsize": 8,
                  "xrel": 3750.9,
                  "ysize": 9,
                  "xindex": -17,
                  "yindex": 5
              },
              {
                  "defectID": 5,
                  "defectArea": 32,
                  "gdsX": 1992.4,
                  "gdsY": 3960.4,
                  "grayMin": 22.0,
                  "grayMax": 78.0,
                  "grayMean": 48.1,
                  "alg": 1,
                  "radius": 71617.3,
                  "select": 1,
                  "yrel": 2881.7,
                  "xsize": 6,
                  "xrel": 2308.6,
                  "ysize": 10,
                  "xindex": -10,
                  "yindex": -2
              },
              {
                  "defectID": 6,
                  "defectArea": 27,
                  "gdsX": 1828.2,
                  "gdsY": 3531.2,
                  "grayMin": 26.0,
                  "grayMax": 87.0,
                  "grayMean": 58.7,
                  "alg": 1,
                  "radius": 78737.2,
                  "select": 1,
                  "yrel": 1073.6,
                  "xsize": 6,
                  "xrel": 4009.7,
                  "ysize": 6,
                  "xindex": -11,
                  "yindex": 2
              },
              {
                  "defectID": 7,
                  "defectArea": 26,
                  "gdsX": 6100.2,
                  "gdsY": 4950.2,
                  "grayMin": 27.0,
                  "grayMax": 77.0,
                  "grayMean": 56.5,
                  "alg": 1,
                  "radius": 113959.3,
                  "select": 1,
                  "yrel": 947.3,
                  "xsize": 6,
                  "xrel": 3112.4,
                  "ysize": 5,
                  "xindex": 10,
                  "yindex": -10
              },
              {
                  "defectID": 8,
                  "defectArea": 26,
                  "gdsX": 5083.6,
                  "gdsY": 6430.3,
                  "grayMin": 24.0,
                  "grayMax": 76.0,
                  "grayMean": 44.7,
                  "alg": 1,
                  "radius": 127239.3,
                  "select": 1,
                  "yrel": 3226.8,
                  "xsize": 6,
                  "xrel": 3349.3,
                  "ysize": 7,
                  "xindex": 5,
                  "yindex": -23
              },
              {
                  "defectID": 9,
                  "defectArea": 25,
                  "gdsX": 1720.1,
                  "gdsY": 6593.5,
                  "grayMin": 33.0,
                  "grayMax": 73.0,
                  "grayMean": 57.0,
                  "alg": 1,
                  "radius": 145208.2,
                  "select": 1,
                  "yrel": 1314.6,
                  "xsize": 7,
                  "xrel": 8080.8,
                  "ysize": 4,
                  "xindex": -12,
                  "yindex": -24
              },
              {
                  "defectID": 10,
                  "defectArea": 19,
                  "gdsX": 3976.4,
                  "gdsY": 3937.4,
                  "grayMin": 22.0,
                  "grayMax": 71.0,
                  "grayMean": 47.3,
                  "alg": 1,
                  "radius": 14556.3,
                  "select": 1,
                  "yrel": 3853.1,
                  "xsize": 4,
                  "xrel": 8397.8,
                  "ysize": 6,
                  "xindex": -1,
                  "yindex": -2
              },
              {
                  "defectID": 11,
                  "defectArea": 16,
                  "gdsX": 6914.1,
                  "gdsY": 2512.8,
                  "grayMin": 19.0,
                  "grayMax": 79.0,
                  "grayMean": 53.3,
                  "alg": 1,
                  "radius": 146763.7,
                  "select": 1,
                  "yrel": 4218.8,
                  "xsize": 4,
                  "xrel": 2950.3,
                  "ysize": 6,
                  "xindex": 14,
                  "yindex": 10
              },
              {
                  "defectID": 12,
                  "defectArea": 16,
                  "gdsX": 4904.4,
                  "gdsY": 4435.9,
                  "grayMin": 25.0,
                  "grayMax": 47.0,
                  "grayMean": 34.6,
                  "alg": 1,
                  "radius": 59070.2,
                  "select": 1,
                  "yrel": 2732.7,
                  "xsize": 4,
                  "xrel": 4415.7,
                  "ysize": 7,
                  "xindex": 4,
                  "yindex": -6
              },
              {
                  "defectID": 13,
                  "defectArea": 14,
                  "gdsX": 5417.7,
                  "gdsY": 5473.1,
                  "grayMin": 21.0,
                  "grayMax": 31.0,
                  "grayMean": 26.7,
                  "alg": 1,
                  "radius": 102982.9,
                  "select": 1,
                  "yrel": 3781.1,
                  "xsize": 4,
                  "xrel": 191.0,
                  "ysize": 8,
                  "xindex": 7,
                  "yindex": -15
              },
              {
                  "defectID": 14,
                  "defectArea": 12,
                  "gdsX": 2916.2,
                  "gdsY": 2943.9,
                  "grayMin": 21.0,
                  "grayMax": 40.0,
                  "grayMean": 30.7,
                  "alg": 1,
                  "radius": 47393.6,
                  "select": 1,
                  "yrel": 957.9,
                  "xsize": 5,
                  "xrel": 6788.8,
                  "ysize": 4,
                  "xindex": -6,
                  "yindex": 7
              },
              {
                  "defectID": 15,
                  "defectArea": 11,
                  "gdsX": 2948.7,
                  "gdsY": 4349.5,
                  "grayMin": 20.0,
                  "grayMax": 33.0,
                  "grayMean": 28.0,
                  "alg": 1,
                  "radius": 39343.6,
                  "select": 1,
                  "yrel": 1396.9,
                  "xsize": 5,
                  "xrel": 8164.8,
                  "ysize": 5,
                  "xindex": -6,
                  "yindex": -5
              },
              {
                  "defectID": 16,
                  "defectArea": 9,
                  "gdsX": 239.3,
                  "gdsY": 3301.4,
                  "grayMin": 24.0,
                  "grayMax": 34.0,
                  "grayMean": 30.2,
                  "alg": 1,
                  "radius": 146577.3,
                  "select": 1,
                  "yrel": 809.0,
                  "xsize": 4,
                  "xrel": 5979.1,
                  "ysize": 4,
                  "xindex": -19,
                  "yindex": 4
              },
              {
                  "defectID": 17,
                  "defectArea": 7,
                  "gdsX": 2818.3,
                  "gdsY": 6520.7,
                  "grayMin": 29.0,
                  "grayMax": 42.0,
                  "grayMean": 33.1,
                  "alg": 1,
                  "radius": 121825.3,
                  "select": 1,
                  "yrel": 4391.4,
                  "xsize": 4,
                  "xrel": 2652.4,
                  "ysize": 4,
                  "xindex": -6,
                  "yindex": -24
              }
          ],
          "summarySpec": {
              "testNo": 0,
              "defDensity": 0.002,
              "ndie": 1543,
              "ndefect": 17,
              "ndefDie": 17
          },
          "defectCnt": 17,
          "defectDieCnt": 16
      }
  ]
};