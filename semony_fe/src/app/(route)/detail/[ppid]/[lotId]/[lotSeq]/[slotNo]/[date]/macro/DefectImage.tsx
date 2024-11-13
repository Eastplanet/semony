'use client';
import React, { useRef, useEffect, useState } from 'react';
import { DefectRecordSpec } from '@/app/types';

interface MacroImageProps {
  src: string;
  alt?: string;
  defects: DefectRecordSpec[];
  setDefects?: (defects: DefectRecordSpec[]) => void;
}

const DefectImage: React.FC<MacroImageProps> = ({ src, alt = 'Macro BMP Example', defects, setDefects }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string[]; defects: DefectRecordSpec[] } | null>(null);
  const [showDefects, setShowDefects] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const intrinsicWidth = 7344;
  const intrinsicHeight = 7500;

  const drawDefects = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !showDefects) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const displayWidth = img.clientWidth;
    const displayHeight = img.clientHeight;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const xScale = displayWidth / intrinsicWidth;
    const yScale = displayHeight / intrinsicHeight;

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
  };

  useEffect(() => {
    drawDefects();
  }, [defects, showDefects, zoom, position]);

  const handleMouseMoveOnCanvas = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    // 마우스 이벤트 위치 조정: 확대/축소 및 이동을 반영
    const mouseX = (e.clientX - rect.left - position.x) / zoom;
    const mouseY = (e.clientY - rect.top - position.y) / zoom;

    const displayWidth = canvas.width / zoom;
    const displayHeight = canvas.height / zoom;
    const xScale = displayWidth / intrinsicWidth;
    const yScale = displayHeight / intrinsicHeight;

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

  const handleClickOnCanvas = () => {
    if (tooltip && setDefects) {
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
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + (direction === 'in' ? 0.1 : -0.1), 1), 3));
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0 ? 'in' : 'out');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <button
        onClick={toggleDefects}
        className="flex font-medium text-sm text-blue-600 rounded-full focus:outline-none z-10 p-2"
      >
        {showDefects ? '🙈 결함 가리기' : '👀 결함 한 눈에 보기'}
      </button>
      <div
        className="relative w-[50vh] h-[50vh] mx-auto overflow-hidden rounded-2xl shadow-md bg-white"
        onWheel={handleWheelZoom}
      >
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onLoad={drawDefects}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            onMouseMove={handleMouseMoveOnCanvas}
            onMouseLeave={() => setTooltip(null)}
            onClick={handleClickOnCanvas}
          />
        </div>

        {/* Tooltip */}
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

      {/* Zoom Controls */}
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
