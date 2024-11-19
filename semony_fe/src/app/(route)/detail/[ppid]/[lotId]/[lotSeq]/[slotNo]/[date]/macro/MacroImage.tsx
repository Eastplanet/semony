'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { DefectRecordSpec } from '@/app/types';

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
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Intrinsic image size
  const intrinsicWidth = 7344;
  const intrinsicHeight = 7500;

  const drawDefects = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!defects || defects.length === 0) return;

    // Scale GDS coordinates to canvas dimensions
    const xScale = canvas.width / intrinsicWidth;
    const yScale = canvas.height / intrinsicHeight;

    defects.forEach((defect) => {
      // Calculate defect position and size
      const xPos = (defect.gdsX / 20) * xScale + 10;
      const yPos = (defect.gdsY / 20) * yScale + 10;
      const defectWidth = (defect.xsize / 16) * xScale;
      const defectHeight = (defect.ysize / 16) * yScale;

      ctx.beginPath();
      ctx.rect(xPos, yPos, defectWidth, defectHeight);
      ctx.strokeStyle = 'rgba(75, 213, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawDefects();
  }, [defects, scale, position]);

  const handleMouseMoveOnCanvas = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find a defect that overlaps with the mouse position
    const xScale = canvas.width / intrinsicWidth;
    const yScale = canvas.height / intrinsicHeight;

    const hoveredDefect = defects.find((defect) => {
      const xPos = (defect.gdsX / 20) * xScale + 10;
      const yPos = (defect.gdsY / 20) * yScale + 10;
      const defectWidth = (defect.xsize / 16) * xScale;
      const defectHeight = (defect.ysize / 16) * yScale;

      return (
        mouseX >= xPos &&
        mouseX <= xPos + defectWidth &&
        mouseY >= yPos &&
        mouseY <= yPos + defectHeight
      );
    });

    if (hoveredDefect) {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        text: `X: ${hoveredDefect.gdsX}, Y: ${hoveredDefect.gdsY}`,
      });
    } else {
      setTooltip(null);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 1), 10));
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
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleMouseMoveOnCanvas(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setDragging(false);
          setTooltip(null);
        }}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center center',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      >
        <Image src={src} alt={alt} width={intrinsicWidth} height={intrinsicHeight} className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0" width={intrinsicWidth} height={intrinsicHeight} />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-700 text-white text-xs rounded px-2 py-1 shadow-lg"
          style={{
            top: tooltip.y + 15,
            left: tooltip.x + 15,
            pointerEvents: 'none',
          }}
        >
          {tooltip.text}
        </div>
      )}
      
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
