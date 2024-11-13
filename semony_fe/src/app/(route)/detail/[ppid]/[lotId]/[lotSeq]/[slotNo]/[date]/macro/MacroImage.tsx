'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export interface DefectRecordSpec {
  defectID: number;
  defectArea: number;
  gdsX: number;
  gdsY: number;
  grayMin: number;
  grayMax: number;
  grayMean: number;
  alg: number;
  radius: number;
  select: number;
  yrel: number;
  xsize: number;
  xrel: number;
  ysize: number;
  xindex: number;
  yindex: number;
  step: number;
}

interface MacroImageProps {
  src: string;
  alt?: string;
  defects: DefectRecordSpec[];
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = 'Macro BMP Example', defects }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Set intrinsic image size and scaling factor
  const intrinsicWidth = 7344;
  const intrinsicHeight = 7500;
  const scaleFactor = 42.25; // 1 pixel = 42.25 um

  const drawDefects = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // defects가 유효한지 확인
    if (!defects || defects.length === 0) return;
  
    defects.forEach((defect) => {
      const xPos = (defect.gdsX / scaleFactor) * (canvas.width / intrinsicWidth);
      const yPos = (defect.gdsY / scaleFactor) * (canvas.height / intrinsicHeight);
      const defectSize = (defect.defectArea / scaleFactor) * 0.5; // Adjust size as needed
  
      ctx.beginPath();
      ctx.rect(xPos, yPos, defectSize, defectSize);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };
  
  useEffect(() => {
    drawDefects();
  }, [defects, scale, position]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 1), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="relative w-[55vh] h-[55vh] mx-auto rounded-2xl shadow-md bg-white overflow-hidden">
      <div
        className="relative w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setDragging(false)}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center center',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      >
        <Image src={src} alt={alt} width={2000} height={2000} className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0" width={500} height={500} />
      </div>
      
      <button
        onClick={clearCanvas}
        className="absolute top-4 left-4 p-1 text-xs bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 shadow-md"
        aria-label="Clear Canvas"
      >
        🗑️
      </button>
    </div>
  );
};

export default MacroImage;
