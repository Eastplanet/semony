// src/app/detail/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import request from '@/app/apis/request';
import { DieLocation } from '@/app/types';
import { DefectRecordSpec } from '@/app/mocks/defect_record';
import { waferInspectionsData } from '@/app/mocks/defect_record';

interface DataContextProps {
  dieLocations: DieLocation[];
  defectRecordsStep1: DefectRecordSpec[];
  defectRecordsStep2: DefectRecordSpec[];
  defectRecordsStep3: DefectRecordSpec[];
  selectedSteps: number[];
  toggleStep: (step: number) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
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
    request(`wafer/detail?ppid=0TT_EWIM_NO_CHHP&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&slotNo=24`).then((data) => {
      setDieLocations(data.DieLocations || []);
      
      // 각 defectRecordSpec에 step 정보를 추가하여 저장
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

      setDefectRecordsStep1(step1Data);
      setDefectRecordsStep2(step2Data);
      setDefectRecordsStep3(step3Data);
    });
  };

  useEffect(() => {
    fetchData();
    setDefectRecordsStep1(waferInspectionsData.waferInspections[0].defectRecordSpec.map((defect: DefectRecordSpec) => ({
      ...defect,
      step: 1,
    })));
    setDefectRecordsStep2(waferInspectionsData.waferInspections[1].defectRecordSpec.map((defect: DefectRecordSpec) => ({
      ...defect,
      step: 2,
    })));
    setDefectRecordsStep3(waferInspectionsData.waferInspections[2].defectRecordSpec.map((defect: DefectRecordSpec) => ({
      ...defect,
      step: 3,
    })));
  }, []);

  return (
    <DataContext.Provider value={{ dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps, toggleStep }}>
      {children}
    </DataContext.Provider>
  );
};
