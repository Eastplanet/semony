'use client';

import React, { useContext, useState } from 'react';
import WaferGrid from './WaferGrid';
import SummarySection from './SummarySection';
import ImageGallery from './ImageGallery';
import { DataContext } from '../../../../../../DataContext';
import { DieLocations } from '@/app/mocks/defect_record';
import { DefectRecordSpec, DieLocation } from '@/app/types';

export default function MainPage() {
  const dataContext = useContext(DataContext);
  const [currentDefects, setCurrentDefects] = useState<{ x: number; y: number; defects: DefectRecordSpec[] } | null>(null);

  // 확대/축소 및 위치 상태
  const [zoom, setZoom] = useState(1); // 기본 확대 비율
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 초기 위치
  const [dragging, setDragging] = useState(false); // 드래깅 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false); // WaferGrid 위 마우스 호버 상태

  if (!dataContext) {
    return <div>Loading...</div>;
  }

  const { dieLocations, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3, selectedSteps, threeStepInfo } = dataContext;
  const stepData = [
    { step: 1, defects: defectRecordsStep1 },
    { step: 2, defects: defectRecordsStep2 },
    { step: 3, defects: defectRecordsStep3 },
  ];

  const currentStepData = stepData.filter((data) => selectedSteps.includes(data.step));

  const minX = Math.min(...dieLocations.map((d: DieLocation) => d.xindex));
  const maxX = Math.max(...dieLocations.map((d: DieLocation) => d.xindex));
  const minY = Math.min(...dieLocations.map((d: DieLocation) => d.yindex));
  const maxY = Math.max(...dieLocations.map((d: DieLocation) => d.yindex));

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;

  // 확대/축소 제어 함수
  const handleWheel = (e: React.WheelEvent) => {
    if (!isHovered) return; // WaferGrid 위에 마우스가 없으면 아무 작업도 수행하지 않음
    e.preventDefault();
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + e.deltaY * -0.001, 0.5), 3));
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 드래그 이동
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="pt-0" onWheel={handleWheel} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <SummarySection defectData={threeStepInfo} />

      <div className="mx-24 flex items-start p-2 gap-8 justify-around">
        <div
          className="overflow-hidden mx-auto my-auto  rounded-xl p-3"
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <WaferGrid
            dieLocations={DieLocations}
            defectRecords={currentStepData.flatMap((data) => data.defects) || []}
            totalRows={totalRows}
            totalCols={totalCols}
            minX={minX}
            minY={minY}
            setCurrentDefects={setCurrentDefects}
            zoom={zoom}
            position={position}
          />
        </div>
        <ImageGallery currentDefects={currentDefects} />
      </div>
    </div>
  );
}
