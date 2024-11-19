// src/types.ts
export interface ModuleData {
  moduleId: string;
  defect: string;
  eventDtts: string;
}

export interface WaferData {
  ppid: string;
  lotId: string;
  totalDefectCount: number;
  slotNo: string;
  lotSeq: string;
  modules: ModuleData[]; // modules 속성 추가
  date: string;
}

export interface stepInfo {
  moduleId: string;
  defectDieCnt: number;
  defectCnt: number;
  nDie: number;
  defDensity: number;
  eventDtts: string;
}
  
export interface DieLocation {
    xindex: number;
    yindex: number;
  }
  
export interface DefectRecord {
    XINDEX: number;
    YINDEX: number;
    id: string;
    alg: string;
    xrel: number;
    area: number;
    yrel: number;
    xsize: number;
    ysize: number;
    gdsx: number;
    gdsy: number;
    gray_max: number;
    gray_min: number;
    gray_mean: number;
    radius: number;
  }

  export interface DefectRecordSpec {
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
    step: number;
  }
  
  export interface SummarySpec {
    testNo: number;
    defDensity: number;
    ndefect: number;
    ndie: number;
    ndefDie: number;
  }

export interface WaferInspectionStep {
  moduleId: string;
  eventDtts: string;
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
  dieLocations: DieLocation[] | null;
  defectRecordSpec: DefectRecordSpec[];
  summarySpec: SummarySpec;
  defectCnt: number;
  defectDieCnt: number;
}

export interface ImageProps {
  fileName: string;
  data: string;
}


export interface imagesPerStep {
  ipus: { 
    ipuNum: number; 
    images: ImageProps[]; 
  }[]; // 여러 개의 ipu 객체 포함 가능
  macro: ImageProps | null;
  golden: ImageProps | null;
  ebr: ImageProps | null;
}

export interface MainImageItem {
  golden: ImageProps;
  macro: ImageProps;
  ebr?: ImageProps;
}

export type MainImages = MainImageItem[];

export interface ipus {
  ipuNum: number;
  images: ImageProps[];
}

export type IPUImages = ipus[][];
