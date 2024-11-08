// MainPage.tsx
'use client';

import React, { useContext } from 'react';
import WaferGrid from '@/app/components/WaferGrid';
import SummarySection from './SummarySection';
import { defectInfos } from '@/app/mocks/wafer_map';
import ImageGallery from './ImageGallery';
import { DataContext } from '../DataContext';
import { DefectRecordSpec } from '@/app/mocks/defect_record';
import { DieLocation } from '@/app/types';

export default function MainPage() {  
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    return <div>Loading...</div>;
  }

  const { dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps } = dataContext;

  const images = [
    { src: '/mocks/macro/0001_golden.TIF', label: "GOLDEN" },
    { src: '/mocks/macro/0001_ins.TIF', label: "INSPECTION" },
    { src: '/mocks/macro/0001_bin.TIF', label: "BINARIZE" },
    { src: '/mocks/macro/0001_psm.TIF', label: "PSM" },
  ];

  const stepData = [
    { step: 1, defects: defectRecordsStep1 },
    { step: 2, defects: defectRecordsStep2 },
    { step: 3, defects: defectRecordsStep3 },
  ];

  const currentStepData = stepData.filter((data) => selectedSteps.includes(data.step)); // 선택된 스텝 데이터 필터링
  // 모든 결함 데이터를 결합
  const allDefectRecords = [
    ...defectRecordsStep1,
    ...defectRecordsStep2,
    ...defectRecordsStep3,
  ];

  const minX = Math.min(
    ...dieLocations.map((d: DieLocation) => d.XINDEX),
    ...allDefectRecords.map((defect: DefectRecordSpec) => defect.xindex) // allDefectRecords에서 xindex 추출
  );

  const maxX = Math.max(
    ...dieLocations.map((d: DieLocation) => d.XINDEX),
    ...allDefectRecords.map((defect: DefectRecordSpec) => defect.xindex) // allDefectRecords에서 xindex 추출
  );

  const minY = Math.min(
    ...dieLocations.map((d: DieLocation) => d.YINDEX),
    ...allDefectRecords.map((defect: DefectRecordSpec) => defect.yindex) // allDefectRecords에서 yindex 추출
  );

  const maxY = Math.max(
    ...dieLocations.map((d: DieLocation) => d.YINDEX),
    ...allDefectRecords.map((defect: DefectRecordSpec) => defect.yindex) // allDefectRecords에서 yindex 추출
  );

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;

  return (
    <div className="pt-0">
      <SummarySection defectData={defectInfos} />

      <div className="mx-24 flex items-start p-2 gap-8 justify-between">
        <WaferGrid
          dieLocations={dieLocations}
          defectRecords={currentStepData.flatMap((data) => data.defects) || []}
          totalRows={totalRows}
          totalCols={totalCols}
          minX={minX}
          minY={minY}
        />

        <ImageGallery images={images} />
      </div>
    </div>
  );
}
