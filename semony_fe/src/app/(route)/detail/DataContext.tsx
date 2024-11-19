// src/app/detail/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import request from '@/app/apis/request';
import { DieLocation, stepInfo, DefectRecordSpec, WaferInspectionStep, MainImages, IPUImages } from '@/app/types';
import {EbrResultData} from '@/app/types/ebr';


interface DataContextProps {
  dieLocations: DieLocation[];
  defectRecordsStep1: DefectRecordSpec[];
  defectRecordsStep2: DefectRecordSpec[];
  defectRecordsStep3: DefectRecordSpec[];
  selectedSteps: number[];
  toggleStep: (step: number) => void;
  threeStepInfo: stepInfo[];
  mainImages: MainImages;
  IPUImages: IPUImages;  
  healthData: HealthData[]; // 추가된 health data
  ebrResults: EbrResultData | null; // EBR 결과
}

interface HealthData {
  moduleId: string;
  ip: string;
  port: string;
  healthy: boolean;
}


interface ImageData {
  fileName: string;
  data: string;
}

// IPU 타입 정의
interface IPU {
  ipuNum: number;
  images: ImageData[];
}

// Group 타입 정의
interface Group {
  ipus: IPU[];
  golden: ImageData;
  ebr: ImageData | null;
  macro: ImageData;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  ppid: string;
  lotId: string;
  lotSeq: string;
  slotNo: string;
  date: string;
  children: ReactNode;
}

export const DataProvider = ({ ppid, lotId, lotSeq, slotNo, date, children }: DataProviderProps) => {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [threeStepInfo, setThreeStepInfo] = useState<stepInfo[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecordSpec[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);
  const [mainImages, setMainImages] = useState<MainImages>([]);
  const [IPUImages, setIPUImages] = useState<IPUImages>([]);
  const [healthData, setHealthData] = useState<HealthData[]>([]); // 추가된 healthData 상태
  const [ebrResults, setEbrResults] = useState<EbrResultData | null>(null);



  const toggleStep = (step: number) => {
    setSelectedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const fetchEBRResults = () => {
    request(`wafer/detail/result?ppid=${ppid}&slotNo=${slotNo}&lotId=${lotId}&lotSeq=${lotSeq}&date=${date}`)
    .then((data:EbrResultData) =>{
      setEbrResults(data);
      console.log(data);
    })
  }


  const fetchMainImages = () => {
    request(`wafer/images/summary?ppid=${ppid}&slotNo=${slotNo}&lotId=${lotId}&lotSeq=${lotSeq}&date=${date}`)

    // request(`wafer/images/summary?ppid=0TT_EWIM_NO_CHHP&slotNo=18&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&date=2024-10-03T00:00:00`)
      .then((data) => {
        const formattedData: MainImages = [
          {
            macro: data[0].macro,
            golden: data[0].golden,
          },
          {
            macro: data[1].macro,
            golden: data[1].golden,
            ebr: data[1].ebr,
          },
          {
            macro: data[2].macro,
            golden: data[2].golden,
          }
        ];
        setMainImages(formattedData);
        console.log(formattedData);
      })
      .catch((error) => {
        console.error("Failed to fetch main images:", error);
      });
  };

  const fetchIPUImages = () => {
    request(`wafer/images?ppid=${ppid}&slotNo=${slotNo}&lotId=${lotId}&lotSeq=${lotSeq}&date=${date}`)

    // request(`wafer/images?ppid=0TT_EWIM_NO_CHHP&slotNo=18&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&date=2024-10-03T00:00:00`)
  .then((data: Group[]) => {
    const formattedData: IPUImages = data.map((group) =>
      group.ipus.map((ipu) => ({
        ipuNum: ipu.ipuNum,
        images: ipu.images.map((image) => ({
          fileName: image.fileName,
          data: image.data,
        })),
      }))
    );
    setIPUImages(formattedData);
    console.log(formattedData); // 형식에 맞게 변환된 IPUImages 확인
  })
  .catch((error) => {
    console.error("Failed to fetch IPU images:", error);
  });
  };

  const fetchHealth = () => {
    request(`health`)
      .then((data: HealthData[]) => {
        setHealthData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch health data:", error);
      });
  };
  
  

  const fetchData = () => {
    request(`wafer/detail?ppid=${ppid}&slotNo=${slotNo}&lotId=${lotId}&lotSeq=${lotSeq}&date=${date}`)

    // request(`wafer/detail?ppid=0TT_EWIM_NO_CHHP&slotNo=18&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&date=2024-10-03T00:00:00`)
    .then((data) => {
      setDieLocations(data.dieLocations);
      const step1Data = data.waferInspections[0].defectRecordSpec.map((defect: DefectRecordSpec) => ({
        ...defect,
        step: 1, // 1단계 결함
      }));
      const step2Data = data.waferInspections[1].defectRecordSpec.map((defect: DefectRecordSpec) => ({
        ...defect,
        step: 2, // 2단계 결함
      }));
      const step3Data = data.waferInspections[2].defectRecordSpec.map((defect: DefectRecordSpec) => ({
        ...defect,
        step: 3, // 3단계 결함
      }));

      const formattedData: stepInfo[] = data.waferInspections.map((step: WaferInspectionStep) => ({
        moduleId: step.moduleId,
        defectDieCnt: step.defectDieCnt,
        defectCnt: step.defectCnt,
        nDie: step.summarySpec.ndie,
        defDensity: step.summarySpec.defDensity,
        eventDtts: step.eventDtts,
      }));
      setThreeStepInfo(formattedData);
      setDefectRecordsStep1(step1Data);
      setDefectRecordsStep2(step2Data);
      setDefectRecordsStep3(step3Data);
    })
    .catch((error) => {
      console.error("Error fetching wafer defect detail data:", error);
    });    
  };

  useEffect(() => {
    fetchMainImages();
    fetchData();
    fetchHealth();
    fetchEBRResults();
    fetchIPUImages();
    
  }, [ppid, lotId, lotSeq, slotNo, date]);


  return (
    <DataContext.Provider value={{ dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps, toggleStep, threeStepInfo, mainImages, IPUImages, healthData, ebrResults }}>
      {children}
    </DataContext.Provider>
  );
};
