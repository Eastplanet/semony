// MainPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WaferGrid from '@/app/components/WaferGrid';
import StepList from '@/app/components/StepList';
import { DefectRecord } from '@/app/types';

interface DieLocation {
  XINDEX: number;
  YINDEX: number;
}


export default function MainPage() {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [defectRecordsStep1, setDefectRecordsStep1] = useState<DefectRecord[]>([]);
  const [defectRecordsStep2, setDefectRecordsStep2] = useState<DefectRecord[]>([]);
  const [defectRecordsStep3, setDefectRecordsStep3] = useState<DefectRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    axios
      .get("http://192.168.30.204/data")
      .then((res) => {
        setDieLocations(res.data.DieLocations || []);
        setDefectRecordsStep1(res.data.DefectRecordSpec || []);
        setDefectRecordsStep2(res.data.DefectRecordSpec || []);
        setDefectRecordsStep3(res.data.DefectRecordSpec || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dieLocations.length) {
    return <div>Loading...</div>;
  }

  const stepData = [
    { step: 1, defects: defectRecordsStep1 },
    { step: 2, defects: defectRecordsStep2 },
    { step: 3, defects: defectRecordsStep3 },
  ];
  console.log(dieLocations)

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
    <div className="p-8">
      
      {/* 스텝별 탭 버튼 */}
      <div className="flex justify-center mb-4 space-x-4">
        {[1, 2, 3].map((step) => (
          <button
            key={step}
            className={`px-4 py-2 rounded ${activeStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveStep(step)}
          >
            Step {step}
          </button>
        ))}
      </div>

      <div className="flex items-start justify-center  p-8 gap-8">
        {/* 좌측 WaferGrid 영역 */}
        <div className="w-3/5">
          <WaferGrid
            dieLocations={dieLocations}
            defectRecords={currentStepData?.defects || []}
            totalRows={totalRows}
            totalCols={totalCols}
            minX={minX}
            minY={minY}
          />
        </div>

        {/* 우측 리스트 컴포넌트 영역 */}
        <div className="w-2/5 font-normal">
          <StepList defects={currentStepData?.defects || []} />
        </div>
      </div>
    </div>
  );
}
