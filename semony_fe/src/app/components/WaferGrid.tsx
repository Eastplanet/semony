import React, { useMemo, useState } from 'react';
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
  currentDefects: { x: number; y: number; defects: DefectRecordSpec[] } | null;
  setCurrentDefects: React.Dispatch<React.SetStateAction<{ x: number; y: number; defects: DefectRecordSpec[] } | null>>;
}

const DIE_WIDTH = 8639.48;
const DIE_HEIGHT = 4986.74;

const WaferGrid: React.FC<WaferGridProps> = ({ dieLocations, defectRecords, totalRows, totalCols, minX, minY, setCurrentDefects, currentDefects}) => {
  const [tooltip, setTooltip] = useState<{x: number; y: number; defects: DefectRecordSpec[] }| null>(null);

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

        if (dieLocations.some(die => die.XINDEX === x && die.YINDEX === y)) {
          return { type: 'active' };
        }

        return { type: '' };
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
      setTooltip(prev => prev && { ...prev, x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
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
    <div
    className="relative aspect-square w-[70vh] max-w-full border-2 border-orange-500 rounded-full overflow-hidden grid"
    style={{
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
                ${cell.type === 'active' ? 'bg-orange-200' : 'bg-white'}
                border-orange-300`}
            ></div>
          );
        })
      )}

      {tooltip && (
        <div
          className="fixed p-2 bg-black text-white text-sm rounded z-50 flex space-x-2"
          style={{
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            transform: 'translate(0, -50%)',
            whiteSpace: 'pre-line',
          }}
        >
          {tooltip.defects.map((defect, index) => (
            <div key={index} className="p-2 bg-opacity-70 rounded flex flex-col items-center" style={{ backgroundColor: getDefectColor(defect.step) }}>
              <div className="font-bold">Step {defect.step}</div>
              <div className="text-gray-200 text-xs">
                {Object.entries(defect)
                  .filter(([key]) => key !== 'gdsX' && key !== 'gdsY') // gdsx, gdsy 제외
                  .map(([key, value]) => (
                    <div key={key}>{`${key}: ${value}`}</div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaferGrid;
