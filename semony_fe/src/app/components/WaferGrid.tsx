// components/WaferGrid.tsx
import React from 'react';

interface DieLocation {
  XINDEX: number;
  YINDEX: number;
}

interface DefectRecord {
  XINDEX: number;
  YINDEX: number;
}

interface WaferGridProps {
  dieLocations: DieLocation[];
  defectRecords: DefectRecord[];
  totalRows: number;
  totalCols: number;
  minX: number;
  minY: number;
}

const WaferGrid: React.FC<WaferGridProps> = ({ dieLocations, defectRecords, totalRows, totalCols, minX, minY }) => {
  // 그리드 초기화
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
    <div
      className="relative w-[500px] h-[500px] border-2 border-orange-500 rounded-full overflow-hidden grid"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
        gridTemplateRows: `repeat(${totalRows}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
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
      )}
    </div>
  );
};

export default WaferGrid;
