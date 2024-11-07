// MainPage.tsx
'use client';

import React, { useContext } from 'react';
import WaferGrid from '@/app/components/WaferGrid';
import SummarySection from './SummarySection';
import { defectInfos, summary } from '@/app/mocks/wafer_map';
import ImageGallery from './ImageGallery';
import { DataContext } from '../DataContext';
import { DefectRecordSpec } from '@/app/mocks/defect_record';
import { DieLocation } from '@/app/types';

export default function MainPage() {  
  const dataContext = useContext(DataContext);

  // dataContext가 undefined일 때 처리
  if (!dataContext) {
    return <div>Loading...</div>;
  }

  const { dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3 } = dataContext;
  const activeStep = 1;

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

  const currentStepData = stepData.find((data) => data.step === activeStep);

  const minX = Math.min(
    ...dieLocations.map((d: DieLocation) => d.XINDEX), // d의 타입 명시
    ...(currentStepData?.defects.map((d: DefectRecordSpec) => d.xindex) || [])
  );
  const maxX = Math.max(
    ...dieLocations.map((d: DieLocation) => d.XINDEX),
    ...(currentStepData?.defects.map((d: DefectRecordSpec) => d.xindex) || [])
  );
  const minY = Math.min(
    ...dieLocations.map((d: DieLocation) => d.YINDEX),
    ...(currentStepData?.defects.map((d: DefectRecordSpec) => d.yindex) || [])
  );
  const maxY = Math.max(
    ...dieLocations.map((d: DieLocation) => d.YINDEX),
    ...(currentStepData?.defects.map((d: DefectRecordSpec) => d.yindex) || [])
  );

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;
  console.log(totalRows, totalCols);

  return (
    <div className="p-8 pt-0">
      <SummarySection summaryData={summary} defectData={defectInfos} />

      <div className="mx-24 flex items-start p-8 gap-8 justify-between">
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
