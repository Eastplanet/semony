import React, { useMemo, useState } from 'react';
import { DieLocation, DefectRecordSpec } from '../../../../../../../../types';


interface WaferGridProps {
  dieLocations: DieLocation[];
  defectRecords: DefectRecordSpec[];
  totalRows: number;
  totalCols: number;
  minX: number;
  minY: number;
  setCurrentDefects: React.Dispatch<React.SetStateAction<{ x: number; y: number; defects: DefectRecordSpec[] } | null>>;
  zoom: number;
  position: { x: number; y: number };

}

const DIE_WIDTH = 8639.48;
const DIE_HEIGHT = 4986.74;

const WaferGrid: React.FC<WaferGridProps> = ({ dieLocations, defectRecords, totalRows, totalCols, minX, minY, setCurrentDefects, zoom, position}) => {
  const [tooltip, setTooltip] = useState<{x: number; y: number; defects: DefectRecordSpec[] }| null>(null);
  const [tooltipHovered, setTooltipHovered] = useState(false); // 툴팁에 마우스가 있는지 여부 상태 추가

  // const [zoom, setZoom] = useState(1); // 기본 확대 비율 1
  
  // const handleWheel = (event: React.WheelEvent) => {
  //   event.preventDefault();
  //   if (event.deltaY < 0) {
  //     setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // 최대 3배까지 확대
  //   } else {
  //     setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // 최소 0.5배까지 축소
  //   }
  // };

  // useMemo를 사용하여 grid를 메모이제이션
  const grid = useMemo(() => {
    return Array.from({ length: totalRows }, (_, rowIndex) => {
      return Array.from({ length: totalCols }, (_, colIndex) => {
        const x = colIndex + minX;
        const y = rowIndex + minY;

        const defects = defectRecords.filter(d => d.xindex === x && d.yindex === y);
        if (defects.length > 0) {
          return { type: 'defect', defects };
        }

        if (dieLocations.some(die => die.xindex === x && die.yindex === y)) {
          return  { type: '' };
        }

        return { type: 'none' };
      });
    });
  }, [totalRows, totalCols, minX, minY, dieLocations, defectRecords]);

  const handleMouseEnter = (event: React.MouseEvent, defects: DefectRecordSpec[]) => {
    setTooltip({ x: event.clientX, y: event.clientY, defects });
  };

  const handleMouseClick = (event: React.MouseEvent, defects: DefectRecordSpec[]) => {
    setCurrentDefects({ x: event.clientX, y: event.clientY, defects });
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      const rect = event.currentTarget.getBoundingClientRect();
      const adjustedX = (event.clientX - rect.left - position.x) / zoom;
      const adjustedY = (event.clientY - rect.top - position.y) / zoom;

      setTooltip((prev) => (prev ? { ...prev, x: adjustedX, y: adjustedY } : prev));
    }
  };

  const handleMouseLeave = () => {
    if (!tooltipHovered) {
      setTooltip(null);
    }
  };

  const getNormalizedDefectSize = (area: number) => {
    const dieArea = DIE_WIDTH * DIE_HEIGHT;
    const scaleFactor = 500;
    const normalizedSize = Math.sqrt((area / dieArea) * scaleFactor * scaleFactor);
    return Math.min(Math.max(normalizedSize, 5), 20);
  };

  const getDefectColor = (step: number) => {
    switch (step) {
      case 1:
        return 'bg-blue-500';
      case 2:
        return 'bg-red-500 z-10';
      case 3:
        return 'bg-green-500 ';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
    {tooltip && (
  <div
    className="absolute p-2 bg-black text-white text-sm rounded z-50 flex space-x-2"
    onMouseEnter={() => setTooltipHovered(true)}
    onMouseLeave={() => setTooltipHovered(false)}
    style={{
      top: `20px`, // 확대/축소 및 이동 위치에 맞춘 y 좌표
      left: `20px`, // 확대/축소 및 이동 위치에 맞춘 x 좌표
      transformOrigin: 'top left',
    }}
  >
    {tooltip.defects.slice(0, 4).map((defect, index) => (
      <div
        key={index}
        className="p-2 bg-opacity-70 rounded flex flex-col items-center w-full"
        style={{ backgroundColor: getDefectColor(defect.step) }}
      >
        <div className="font-bold">Step {defect.step}</div>
        <div
          className="text-gray-200 text-xs"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {Object.entries(defect)
            .filter(([key]) => key !== 'gdsX' && key !== 'gdsY')
            .map(([key, value]) => (
              <div key={key}>{`${key}: ${value}`}</div>
            ))}
        </div>
      </div>
    ))}
  </div>
)}

    <div
    className="relative aspect-square w-[75vh] my-auto max-w-full border-2 border-orange-500 rounded-full overflow-hidden grid"
    // onWheel={handleWheel} // 스크롤 이벤트 핸들러 추가
    style={{
      // transform: `scale(${zoom})`, // zoom 상태에 따라 확대/축소 적용
      transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
      transformOrigin: 'center center',
      gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
      gridTemplateRows: `repeat(${totalRows}, 1fr)`,
    }}
  >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell.type === 'defect' && cell.defects) {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative border border-orange-300 bg-white"
                onMouseEnter={(event) => handleMouseEnter(event, cell.defects)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleMouseClick(event, cell.defects)}
              >
                {cell.defects.map((defect, index) => (
                  <div
                    key={index}
                    className={`absolute ${getDefectColor(defect.step)} bg-opacity-70 rounded-full`}
                    style={{
                      width: `${getNormalizedDefectSize(defect.defectArea)}px`,
                      height: `${getNormalizedDefectSize(defect.defectArea)}px`,
                      left: `${(defect.xrel / DIE_WIDTH) * 100}%`,
                      top: `${(defect.yrel / DIE_HEIGHT) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
            );
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-full border 
                ${cell.type === 'none' ? 'bg-slate-200' : 'bg-white'}
                border-orange-300`}
            ></div>
          );
        })
      )}

     
      
    </div></div>
  );
};

export default WaferGrid;
