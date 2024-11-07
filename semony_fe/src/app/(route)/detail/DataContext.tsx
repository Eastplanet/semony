// src/app/detail/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import request from '@/app/apis/request';
import { DieLocation} from '@/app/types';
import { DefectRecordSpec } from '@/app/mocks/defect_record';
import { waferInspectionsData } from '@/app/mocks/defect_record';


interface DataContextProps {
  dieLocations: DieLocation[];
//   imagesData: any;
  defectRecordsStep1: DefectRecordSpec[];
  defectRecordsStep2: DefectRecordSpec[];
  defectRecordsStep3: DefectRecordSpec[];
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecordSpec[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecordSpec[]>([]);
//   const [imagesData, setImagesData] = useState(null);
  const fetchData = () => {
    request(`wafer/detail?ppid=0TT_EWIM_NO_CHHP&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&slotNo=24`).then((data) => {
      setDieLocations(data.DieLocations || []);
    });
  }
  useEffect(() => {
    // 첫 번째 API 요청: Wafer Map 데이터
    fetchData();
    setDefectRecordsStep1(waferInspectionsData.waferInspections[0].defectRecordSpec);
    setDefectRecordsStep2(waferInspectionsData.waferInspections[1].defectRecordSpec);
    setDefectRecordsStep3(waferInspectionsData.waferInspections[2].defectRecordSpec);

    // 두 번째 API 요청: Images 데이터 (Lazy Loading)
    setTimeout(() => {
      request('images')
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }, 1000); // 3초 지연 후 요청
  }, []);

  return (
    <DataContext.Provider value={{ dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3 }}>
      {children}
    </DataContext.Provider>
  );
};
