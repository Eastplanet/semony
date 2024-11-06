// MainPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import WaferGrid from '@/app/components/WaferGrid';
import { DefectRecord } from '@/app/types';
import request from '@/app/apis/request';
import { DieLocation } from '@/app/types';
import SummarySection from './SummarySection';
import { defectInfos, summary } from '@/app/mocks/wafer_map';
import ImageGallery from './ImageGallery';

 export default function MainPage() {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecord[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecord[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecord[]>([]);
  const [activeStep, setActiveStep] = useState(1);

  const fetchData = () => {
    request(`wafer/detail?ppid=0TT_EWIM_NO_CHHP&lotId=LP22024100315_PJ2@89654577&lotSeq=727939436&slotNo=24`).then((data) => {
      setDieLocations(data.DieLocations || []);
      setDefectRecordsStep1(data.waferInspections[0].defectRecordSpec || []);
      setDefectRecordsStep2(data.waferInspections[1].defectRecordSpec || []);
      setDefectRecordsStep3(data.waferInspections[2].defectRecordSpec || []);
    })
  }

  useEffect(() => {
   fetchData();
  }, []);

  const images = [
    {src: '/mocks/macro/0001_golden.TIF', label: "GOLDEN"},
    {src: '/mocks/macro/0001_ins.TIF', label: "INSPECTION"},
    {src: '/mocks/macro/0001_bin.TIF', label: "BINARIZE"},
    {src: '/mocks/macro/0001_psm.TIF', label: "PSM"},
  ];



  // if (!dieLocations.length) {
  //   return <div>Loading...</div>;
  // }

  const stepData = [
    { step: 1, defects: defectRecordsStep1 },
    { step: 2, defects: defectRecordsStep2 },
    { step: 3, defects: defectRecordsStep3 },
  ];

  const currentStepData = stepData.find((data) => data.step === activeStep);

  const minX = Math.min(
    ...dieLocations.map((d) => d.XINDEX),
    ...(currentStepData?.defects.map((d) => d.XINDEX) || [])
  );
  const maxX = Math.max(
    ...dieLocations.map((d) => d.XINDEX),
    ...(currentStepData?.defects.map((d) => d.XINDEX) || [])
  );
  const minY = Math.min(
    ...dieLocations.map((d) => d.YINDEX),
    ...(currentStepData?.defects.map((d) => d.YINDEX) || [])
  );
  const maxY = Math.max(
    ...dieLocations.map((d) => d.YINDEX),
    ...(currentStepData?.defects.map((d) => d.YINDEX) || [])
  );

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;
 
  return (
    <div className="p-8 pt-0">
      
      <SummarySection summaryData={summary} defectData={defectInfos}/>
      
      <div className=" mx-24 flex items-start p-8 gap-8 justify-between">
        {/* 좌측 WaferGrid 영역 */}
        <WaferGrid
          dieLocations={dieLocations}
          defectRecords={currentStepData?.defects || []}
          totalRows={totalRows}
          totalCols={totalCols}
          minX={minX}
          minY={minY}
        />

        {/* 우측 이미지 갤러리 영역 */}
        <ImageGallery images={images} />
      </div>
    </div>
  );
}
