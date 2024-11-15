'use client';
import React, { useRef, useEffect, useState } from 'react';
import { DefectRecordSpec } from '@/app/types';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
  defects: DefectRecordSpec[];
  setDefects?: (defects: DefectRecordSpec[]) => void;
}

const DefectImage: React.FC<MacroImageProps> = ({ src, alt = 'Macro BMP Example', defects, setDefects }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string[]; defects: DefectRecordSpec[] } | null>(null);
  const [showDefects, setShowDefects] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<'zoom' | 'defect'>('defect');
  const [drawing, setDrawing] = useState(false); // 그림 그리기 모드 상태
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그림을 그리는 중인지 여부
  const [drawings, setDrawings] = useState<{ x: number; y: number }[][]>([]); // 그린 경로들의 배열
  const [drawingPath, setDrawingPath] = useState<{ x: number; y: number }[]>([]); // 현재 그리는 경로

  const intrinsicWidth = 7344;
  const intrinsicHeight = 7500;

  const drawDefects = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const displayWidth = img.clientWidth;
    const displayHeight = img.clientHeight;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const xScale = displayWidth / intrinsicWidth;
    const yScale = displayHeight / intrinsicHeight;

    // 결함 그리기
    defects.forEach((defect) => {
      const xPos = defect.gdsX * xScale;
      const yPos = displayHeight - defect.gdsY * yScale;
      const defectWidth = defect.xsize * xScale;
      const defectHeight = defect.ysize * yScale;

      ctx.beginPath();
      ctx.rect(xPos, yPos - defectHeight, defectWidth, defectHeight);
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // 그린 경로 표시
    drawings.forEach((path) => {
      ctx.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 현재 그리는 경로 실시간 표시
    if (isDrawing && drawingPath.length > 0) {
      ctx.beginPath();
      drawingPath.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawDefects();
  }, [defects, showDefects, zoom, position, drawings, drawingPath]);

  const handleMouseMoveOnCanvas = (e: React.MouseEvent) => {
    if (mode === 'zoom') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / zoom;
    const mouseY = (e.clientY - rect.top) / zoom;

    const displayWidth = canvas.width / zoom;
    const displayHeight = canvas.height / zoom;
    const xScale = displayWidth / intrinsicWidth;
    const yScale = displayHeight / intrinsicHeight;

    if (isDrawing) {
      setDrawingPath((prevPath) => [...prevPath, { x: mouseX, y: mouseY }]);
      drawDefects(); // 실시간 그리기 업데이트
      return;
    }

    const hoverMargin = 10;
    const hoveredDefects = defects.filter((defect) => {
      const xPos = defect.gdsX * xScale;
      const yPos = displayHeight - defect.gdsY * yScale;
      const defectWidth = defect.xsize * xScale;
      const defectHeight = defect.ysize * yScale;

      return (
        mouseX >= xPos - hoverMargin &&
        mouseX <= xPos + defectWidth + hoverMargin &&
        mouseY >= yPos - defectHeight - hoverMargin &&
        mouseY <= yPos + hoverMargin
      );
    });

    if (hoveredDefects.length > 0) {
      const tooltipText = hoveredDefects.map(
        (defect) =>
          `DefectID: ${defect.defectID} | Gray Mean: ${defect.grayMean} | Gray Min-Max: ${defect.grayMin} - ${defect.grayMax} | Defect Area: ${defect.defectArea}`
      );

      const tooltipX = e.clientX + 10 + 150 > window.innerWidth ? e.clientX - 160 : e.clientX + 10;
      const tooltipY = e.clientY + 10 + 100 > window.innerHeight ? e.clientY - 110 : e.clientY + 10;

      setTooltip({
        x: tooltipX,
        y: tooltipY,
        text: tooltipText,
        defects: hoveredDefects,
      });
    } else {
      setTooltip(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (drawing) {
      setIsDrawing(true);
      setDrawingPath([]);
    } else if (mode === 'zoom') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode === 'zoom' && isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isDrawing) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = (e.clientX - rect.left) / zoom;
      const mouseY = (e.clientY - rect.top) / zoom;

      setDrawingPath((prevPath) => [...prevPath, { x: mouseX, y: mouseY }]);
      drawDefects(); // 실시간 그리기 업데이트
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setDrawings((prevDrawings) => [...prevDrawings, drawingPath]);
      setDrawingPath([]); // 현재 경로 초기화
    }
    setIsDragging(false);
  };

  const handleClickOnCanvas = (e: React.MouseEvent) => {
    if (!isDrawing && tooltip && setDefects) {
      setDefects(tooltip.defects);
    }
  };

  const toggleDefects = () => {
    setShowDefects((prev) => !prev);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (mode === 'defect') return;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + (direction === 'in' ? 0.1 : -0.1), 1), 3));
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0 ? 'in' : 'out');
  };

  const resetPositionAndZoom = () => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  useEffect(() => {
    if (mode === 'defect') resetPositionAndZoom();
  }, [mode]);

  return (
    <div>
      <div className="flex  items-center justify-between mx-6">
        <button onClick={toggleDefects} className="font-medium text-sm text-blue-600 rounded-full focus:outline-none z-10 p-2">
          {showDefects ? '🙈 결함 가리기' : '👀 결함 한 눈에 보기'}
        </button>
       
        {mode === 'zoom' && (
          <div className="flex items-end ml-7">
            <button onClick={() => setDrawing((prev) => !prev)} className="font-medium text-sm text-purple-600 rounded-full focus:outline-none z-10 p-1">
              {drawing ? '🟥' : '✏️'}
            </button>
            <button onClick={() => setDrawings([])} className="font-medium text-sm text-red-600 rounded-full focus:outline-none z-10 p-1">
              🗑️
            </button>
          </div>
        )} 
        <div className='flex items-center' onClick={() => {
          setMode((prevMode) => {
            const newMode = prevMode === 'zoom' ? 'defect' : 'zoom';
            if (newMode === 'defect') {
              setIsDrawing(false); // 그리기 모드 중지
            }
            return newMode;
          });
        }}>
        <button  className={`font-medium text-sm ${mode === 'zoom' ? "text-blue-600" : "text-green-600"} rounded-full focus:outline-none z-10 p-2`}>
          {mode === 'zoom' ? '🔍 확대/축소 모드' : '🛠 결함 조회 모드'}
        </button>
        <Image src={`/icons/toggle_${mode === 'zoom' ? 'on' : 'off'}.png`} alt="" width={40} height={5} className="h-[70%] w-9"/>
        </div>
      </div>

      <div className="relative w-[50vh] h-[50vh] mx-auto overflow-hidden rounded-2xl shadow-md bg-white" onWheel={handleWheelZoom}>
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center',
            cursor: drawing ? 'default' : isDragging && mode === 'zoom' && !drawing ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img ref={imgRef} src={src} alt={alt} className="w-full h-full object-cover" onLoad={drawDefects} />
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            onMouseMove={handleMouseMoveOnCanvas}
            onMouseLeave={() => setTooltip(null)}
            onClick={handleClickOnCanvas}
          />
        </div>

        {tooltip && (
          <div
            className="fixed bg-gray-700 text-white text-xs rounded p-3 shadow-lg z-30"
            style={{
              top: tooltip.y,
              left: tooltip.x,
              pointerEvents: 'none',
              whiteSpace: 'pre-line',
            }}
          >
            {tooltip.text.map((line, index) => (
              <React.Fragment key={index}>
                <div>{line}</div>
                {index !== tooltip.text.length - 1 && <hr className="border-gray-500 my-2" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => handleZoom('out')} className="text-gray-500 hover:text-gray-700 px-2">
          ➖
        </button>
        <span className="mx-2 text-gray-700">{Math.round(zoom * 100)}%</span>
        <button onClick={() => handleZoom('in')} className="text-gray-500 hover:text-gray-700 px-2">
          ➕
        </button>
      </div>
    </div>
  );
};

export default DefectImage;
