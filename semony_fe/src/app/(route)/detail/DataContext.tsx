// src/app/detail/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import request from '@/app/apis/request';
import { DefectRecord, DieLocation} from '@/app/types';
import axios from "axios";


interface DataContextProps {
  dieLocations: DieLocation[];
//   imagesData: any;
  defectRecordsStep1: DefectRecord[];
  defectRecordsStep2: DefectRecord[];
  defectRecordsStep3: DefectRecord[];
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecord[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecord[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecord[]>([]);
//   const [imagesData, setImagesData] = useState(null);

  useEffect(() => {
    // 첫 번째 API 요청: Wafer Map 데이터
    axios.get("https://192.168.30.204/data")
    .then((res)=> {
        setDieLocations(res.data.DieLocations || []);
        setDefectRecordsStep1(res.data.DefectRecordSpec || []);
        setDefectRecordsStep2(res.data.DefectRecordSpec || []);
        setDefectRecordsStep3(res.data.DefectRecordSpec || []);
    })
    .catch((err) => console.error(err));

    // 두 번째 API 요청: Images 데이터 (Lazy Loading)
    setTimeout(() => {
      request('images')
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }, 3000); // 3초 지연 후 요청
  }, []);

  return (
    <DataContext.Provider value={{ dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3 }}>
      {children}
    </DataContext.Provider>
  );
};
