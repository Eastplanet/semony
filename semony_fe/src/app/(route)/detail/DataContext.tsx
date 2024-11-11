// src/app/detail/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import request from '@/app/apis/request';
import { DieLocation, stepInfo } from '@/app/types';
import { DefectRecordSpec } from '@/app/mocks/defect_record';


interface DataContextProps {
  dieLocations: DieLocation[];
  defectRecordsStep1: DefectRecordSpec[];
  defectRecordsStep2: DefectRecordSpec[];
  defectRecordsStep3: DefectRecordSpec[];
  selectedSteps: number[];
  toggleStep: (step: number) => void;
  threeStepInfo: stepInfo[];
}


export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [threeStepInfo, setThreeStepInfo] = useState<stepInfo[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecordSpec[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);

  const toggleStep = (step: number) => {
    setSelectedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const fetchData = () => {
    request(`wafer/detail?ppid=0TT_EWIM_NO_CHHP&slotNo=18&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&date=2024-10-03T00:00:00`).then((data) => {
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

      const formattedData: stepInfo[] = data.waferInspections.map((step: any) => ({
        moduleId: step.moduleId,
        defectDieCnt: step.defectDieCnt,
        defectCnt: step.defectCnt,
        nDie: step.summarySpec.nDie,
        defDensity: step.summarySpec.defDensity,
        eventDtts: step.eventDtts,
      }));
      setThreeStepInfo(formattedData)

      setDefectRecordsStep1(step1Data);
      setDefectRecordsStep2(step2Data);
      setDefectRecordsStep3(step3Data);
    })
    .catch((error) => {
      console.error("Error fetching wafer defect detail data:", error);

      // setDieLocations(DieLocations);

      // setDefectRecordsStep1(
      //   waferInspectionsData?.waferInspections?.[0]?.defectRecordSpec?.map((defect: DefectRecordSpecWithoutStep) => ({
      //     ...defect,
      //     step: 1,
      //   })) || []
      // );
      // setDefectRecordsStep2(
      //   waferInspectionsData?.waferInspections?.[1]?.defectRecordSpec?.map((defect: DefectRecordSpecWithoutStep) => ({
      //     ...defect,
      //     step: 2,
      //   })) || []
      // );
      // setDefectRecordsStep3(
      //   waferInspectionsData?.waferInspections?.[2]?.defectRecordSpec?.map((defect: DefectRecordSpecWithoutStep) => ({
      //     ...defect,
      //     step: 3,
      //   })) || []
      // );
    });
    request(`wafer/images?ppid=0TT_EWIM_NO_CHHP&slotNo=18&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&date=2024-10-03T00:00:00`).then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetchData();
   
  }, []);

  return (
    <DataContext.Provider value={{ dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps, toggleStep,threeStepInfo }}>
      {children}
    </DataContext.Provider>
  );
};
