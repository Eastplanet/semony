// src/app/detail/MacroImage.tsx

'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = 'Macro BMP Example' }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 1), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (drawMode) {
      setDrawing(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect();
        const adjustedX = (e.clientX - rect.left - position.x) / scale;
        const adjustedY = (e.clientY - rect.top - position.y) / scale;
        ctx.beginPath();
        ctx.moveTo(adjustedX, adjustedY);
      }
    } else {
      setDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && !drawMode) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (drawing && drawMode) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect();
        const adjustedX = (e.clientX - rect.left - position.x) / scale;
        const adjustedY = (e.clientY - rect.top - position.y) / scale;
        ctx.lineTo(adjustedX, adjustedY);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDrawing(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.lineCap = 'round';
      }
    }
  }, []);

  const toggleDrawMode = () => {
    setDrawMode((prev) => !prev);
  };

  // 휴지통 버튼 클릭 시 canvas 초기화
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
    <div className="relative w-[60vh] h-[60vh] max-w-md mx-auto rounded-2xl shadow-md bg-white overflow-hidden">
      <div
        className="relative w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        onMouseLeave={() => {
          setDragging(false);
          setDrawing(false);
        }}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center center',
          cursor: drawMode ? 'crosshair' : dragging ? 'grabbing' : 'grab',
        }}
      >
        <Image src={src} alt={alt} width={1000} height={1000} className="w-full h-full" />
        <canvas ref={canvasRef} className="absolute inset-0" width={500} height={500} />
      </div>
      
      {/* Draw Mode Toggle Button */}
      <button
        onClick={toggleDrawMode}
        className={`absolute top-4 right-4 p-2 rounded-lg ${
          drawMode ? 'bg-red-500' : 'bg-blue-500'
        } text-white text-xs font-semibold transition-colors duration-200 hover:bg-opacity-80 shadow-md`}
      >
        {drawMode ? 'Stop Drawing' : 'Draw'}
      </button>

      {/* Clear Canvas Button (Trash Icon) */}
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
