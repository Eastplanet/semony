// src/types.ts
export interface ModuleData {
  module_id: string;
  defect: string;
  event_dtts: string;
}

export interface WaferData {
  ppid: string;
  lotId: string;
  totalDefectCount: number;
  slotNo: string;
  lotSeq: string;
  modules: ModuleData[]; // modules 속성 추가
}
  
export interface DieLocation {
    XINDEX: number;
    YINDEX: number;
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