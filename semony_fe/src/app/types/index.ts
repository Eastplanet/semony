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