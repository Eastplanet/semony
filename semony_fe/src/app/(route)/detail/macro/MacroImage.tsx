// src/app/ui/components/MacroImage.tsx

import React, { useState } from 'react';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = "Macro BMP Example" }) => {
  const [scale, setScale] = useState(1); // 확대/축소 배율
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 이미지 위치
  const [dragging, setDragging] = useState(false); // 드래그 중인지 여부
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // 드래그 시작 위치

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 0.5), 3));
  };

  const handleZoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  const handleZoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));

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
      const newPosX = e.clientX - dragStart.x;
      const newPosY = e.clientY - dragStart.y;
      setPosition({ x: newPosX, y: newPosY });
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className="relative w-64 h-64 rounded-3xl shadow-lg overflow-hidden bg-gray-700"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setDragging(false)} // 드래그 상태 초기화
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={256}
          height={256}
          className="object-center w-full h-full"
        />
      </div>
      {/* <div className="absolute bottom-2 left-2 flex space-x-2">
        <button
          onClick={handleZoomOut}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <button
          onClick={handleZoomIn}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div> */}
    </div>
  );
};

export default MacroImage;
