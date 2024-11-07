// components/WaferGrid.tsx
import React, { useState } from 'react';
import { DefectRecordSpec } from '../mocks/defect_record';

interface DieLocation {
  XINDEX: number;
  YINDEX: number;
}

interface WaferGridProps {
  dieLocations: DieLocation[];
  defectRecords: DefectRecordSpec[];
  totalRows: number;
  totalCols: number;
  minX: number;
  minY: number;
}

const DIE_WIDTH = 8639.48; // die 가로 크기 (um)
const DIE_HEIGHT = 4986.74; // die 세로 크기 (um)

const WaferGrid: React.FC<WaferGridProps> = ({ dieLocations, defectRecords, totalRows, totalCols, minX, minY }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  // 모든 결함 정보를 툴팁 내용으로 생성하는 함수
  const generateTooltipContent = (defect: DefectRecordSpec) => {
    return Object.entries(defect)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  // 그리드 초기화
  const grid = Array.from({ length: totalRows }, (_, rowIndex) => {
    return Array.from({ length: totalCols }, (_, colIndex) => {
      const x = colIndex + minX;
      const y = rowIndex + minY;

      // defectRecord 위치인지 확인
      const defect = defectRecords.find((d) => d.xindex === x && d.yindex === y);

      // defect 위치가 맞다면 그 위치를 반환
      if (defect) {
        return { type: 'defect', defect };
      }

      // die 위치인지 확인
      if (dieLocations.some((die) => die.XINDEX === x && die.YINDEX === y)) {
        return { type: 'active' };
      }

      // 빈 셀 반환
      return { type: '' };
    });
  });

  const handleMouseEnter = (event: React.MouseEvent, defect: DefectRecordSpec) => {
    const content = generateTooltipContent(defect);
    setTooltip({ x: event.clientX, y: event.clientY, content });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      setTooltip((prevTooltip) => prevTooltip && { ...prevTooltip, x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };


  const getNormalizedDefectSize = (area: number) => {
    const minSize = 5;  // 최소 크기 (픽셀)
    const maxSize = 20; // 최대 크기 (픽셀)
    const scaledSize = Math.sqrt(area) * 0.5; // 크기를 루트 스케일로 줄임
    return Math.min(Math.max(scaledSize, minSize), maxSize);
  };

  return (
    <div
      className="relative w-[500px] h-[500px] border-2 border-orange-500 rounded-full overflow-hidden grid"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
        gridTemplateRows: `repeat(${totalRows}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell.type === 'defect' && cell.defect) {
            const { xrel, yrel, defectArea } = cell.defect;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative border border-orange-300 bg-white"
                onMouseEnter={(event) => handleMouseEnter(event, cell.defect)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* defect 위치를 표시하는 점 */}
                <div
                  className="absolute bg-red-500 rounded-full"
                  style={{
                    width: `${getNormalizedDefectSize(defectArea)}px`, // defectArea에 비례한 크기 설정
                    height: `${getNormalizedDefectSize(defectArea)}px`,
                    left: `${(xrel / DIE_WIDTH) * 100}%`, // xrel을 die 크기에 대한 비율로 변환하여 위치 설정
                    top: `${(yrel / DIE_HEIGHT) * 100}%`, // yrel을 die 크기에 대한 비율로 변환하여 위치 설정
                    transform: 'translate(-50%, -50%)', // 점 중앙 정렬
                  }}
                />
              </div>
            );
          }
          

          // 활성화된 die 위치 설정
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-full border 
                ${cell.type === 'active' ? 'bg-orange-200' : 'bg-white'}
                border-orange-300`}
            ></div>
          );
        })
      )}

      {/* 툴팁 */}
      {tooltip && (
        <div
          className="fixed p-2 bg-black text-white text-sm rounded z-50"
          style={{
            top: tooltip.y + 10, // 마우스 위치 아래로 살짝 이동
            left: tooltip.x + 10, // 마우스 위치 오른쪽으로 살짝 이동
            transform: 'translate(0, -50%)',
            whiteSpace: 'pre-line',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default WaferGrid;
