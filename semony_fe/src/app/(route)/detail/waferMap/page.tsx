// MainPage.tsx
'use client';

import React, { useContext, useState } from 'react';
import WaferGrid from '@/app/components/WaferGrid';
import SummarySection from './SummarySection';
import ImageGallery from './ImageGallery';
import { DataContext } from '../DataContext';
import { DieLocations } from '@/app/mocks/defect_record';
import { DefectRecordSpec, DieLocation } from '@/app/types';

export default function MainPage() {  
  const dataContext = useContext(DataContext);
  const [currentDefects, setCurrentDefects] = useState<{x: number; y: number; defects: DefectRecordSpec[] }| null>(null);

  if (!dataContext) {
    return <div>Loading...</div>;
  }

  const { dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps, threeStepInfo } = dataContext;
  const stepData = [
    { step: 1, defects: defectRecordsStep1 },
    { step: 2, defects: defectRecordsStep2 },
    { step: 3, defects: defectRecordsStep3 },
  ];

  const currentStepData = stepData.filter((data) => selectedSteps.includes(data.step)); // 선택된 스텝 데이터 필터링


  const minX = Math.min(
    ...dieLocations.map((d: DieLocation) => d.xindex)
  );

  const maxX = Math.max(
    ...dieLocations.map((d: DieLocation) => d.xindex)
  );

  const minY = Math.min(
    ...dieLocations.map((d: DieLocation) => d.yindex)
  );

  const maxY = Math.max(
    ...dieLocations.map((d: DieLocation) => d.yindex)
  );

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;

  return (
    <div className="pt-0">
      <SummarySection defectData={threeStepInfo} />

      <div className="mx-24 flex items-start p-2 gap-8 justify-around">
        <div className="overflow-hidden mx-auto my-auto">
        <WaferGrid
          dieLocations={DieLocations}
          defectRecords={currentStepData.flatMap((data) => data.defects) || []}
          totalRows={totalRows}
          totalCols={totalCols}
          minX={minX}
          minY={minY}
          setCurrentDefects={setCurrentDefects}
        />
      </div>
        <ImageGallery currentDefects={currentDefects} />
      </div>
    </div>
  );
}
