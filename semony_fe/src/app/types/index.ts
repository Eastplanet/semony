// src/types.ts
export interface ModuleData {
  module_id: string;
  defect: string;
  event_dtts: string;
}

export interface WaferData {
  date: string;
  ppid: string;
  lotId: string;
  defectCount: number;
  step1: number;
  step2: number;
  step3: number;
  slotId: string;
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