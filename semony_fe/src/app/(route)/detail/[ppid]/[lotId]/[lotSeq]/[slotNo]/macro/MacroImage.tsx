'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = 'Macro BMP Example' }) => {
  const [scale, setScale] = useState(1); // Zoom scale
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const [dragging, setDragging] = useState(false); // If the image is being dragged
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Initial drag start position
  const [drawing, setDrawing] = useState(false); // If the user is drawing
  const [drawMode, setDrawMode] = useState(false); // Toggle for drawing mode
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle zoom in/out
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 0.5), 3));
  };

  // Handle image dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (drawMode) {
      // Start drawing if in drawing mode
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
      // Start dragging if not in drawing mode
      setDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && !drawMode) {
      // Handle dragging the image
      const newPosX = e.clientX - dragStart.x;
      const newPosY = e.clientY - dragStart.y;
      setPosition({ x: newPosX, y: newPosY });
    } else if (drawing && drawMode) {
      // Handle drawing on the canvas
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

  // Prevent the context menu from showing up on right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red'; // You can change the color and thickness here
        ctx.lineCap = 'round';
      }
    }
  }, []);

  // Toggle drawing mode
  const toggleDrawMode = () => {
    setDrawMode((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleDrawMode}
        className={`absolute top-2 left-2 px-2 py-1 rounded bg-${drawMode ? 'red-500' : 'blue-500'} text-white`}
      >
        {drawMode ? 'Stop Drawing' : 'Draw'}
      </button>
      <div className="relative w-96 h-96 rounded-3xl shadow-lg overflow-hidden bg-gray-700">
        <div
          className="w-full h-full"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu} // Prevent right-click menu
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
          <Image src={src} alt={alt} width={500} height={500} className="object-center" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default MacroImage;
