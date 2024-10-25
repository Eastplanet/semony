'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DieLocation {
  XINDEX: number;
  YINDEX: number;
}

interface DefectRecord {
  XINDEX: number;
  YINDEX: number;
}

export default function MainPage() {
  const [dieLocations, setDieLocations] = useState<DieLocation[]>([]);
  const [defectRecords, setDefectRecords] = useState<DefectRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 데이터를 가져와서 좌표 데이터를 상태에 저장
    axios
      .get("http://192.168.30.204/data")
      .then((res) => {
        setDieLocations(res.data.DieLocations);
        setDefectRecords(res.data.DefectRecordSpec);
      })
      .catch((err) => setError(err.message));
  }, []);

  // 에러 처리
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 로딩 처리
  if (!dieLocations.length || !defectRecords.length) {
    return <div>Loading...</div>;
  }

  // 좌표 기준 중심 다이 위치 (0, 0)이 기준이므로 이를 맞춰 그리드 설정
  const minX = Math.min(...dieLocations.map((d) => d.XINDEX), ...defectRecords.map((d) => d.XINDEX));
  const maxX = Math.max(...dieLocations.map((d) => d.XINDEX), ...defectRecords.map((d) => d.XINDEX));
  const minY = Math.min(...dieLocations.map((d) => d.YINDEX), ...defectRecords.map((d) => d.YINDEX));
  const maxY = Math.max(...dieLocations.map((d) => d.YINDEX), ...defectRecords.map((d) => d.YINDEX));

  const totalRows = maxY - minY + 1;
  const totalCols = maxX - minX + 1;

  // 그리드 범위를 설정하여 표시할 수 있도록 배열 초기화
  const grid = Array.from({ length: totalRows }, (_, rowIndex) => {
    return Array.from({ length: totalCols }, (_, colIndex) => {
      const x = colIndex + minX;
      const y = rowIndex + minY;
      
      // DefectRecordSpec에 해당하면 빨간색으로 표시
      if (defectRecords.some((defect) => defect.XINDEX === x && defect.YINDEX === y)) {
        return 'defect';
      }
      
      // DieLocations에 해당하면 주황색으로 표시
      if (dieLocations.some((die) => die.XINDEX === x && die.YINDEX === y)) {
        return 'active';
      }

      // 그 외는 빈 칸 (흰색)
      return '';
    });
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* 격자를 중심으로 정렬하고, 원형 안에만 표시되도록 수정 */}
      <div className="relative w-96 h-96 border-4 border-orange-500 rounded-full overflow-hidden grid" style={{ gridTemplateColumns: `repeat(${totalCols}, 1fr)`, gridTemplateRows: `repeat(${totalRows}, 1fr)` }}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-full border 
                ${cell === 'defect' ? 'bg-red-500' : ''} 
                ${cell === 'active' ? 'bg-white' : ''} 
                ${cell === '' ? 'bg-white' : ''} 
                border-orange-300`}
            ></div>
          ))
        ))}
      </div>
    </div>
  );
}
