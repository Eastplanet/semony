// ImageGallery.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { src: string; label: string }[]; // 이미지 URL과 라벨 배열
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [zoom, setZoom] = useState(100); // 기본 확대율 100%
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 이미지 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  
  // 확대/축소 기능
  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 10, 500));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 10, 90));

  // 마우스 휠로 확대/축소 조절
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // 전역 스크롤 방지
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // 드래그로 인한 텍스트 선택 방지
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const scaleFactor = zoom / 100; // 확대 배율을 이동 거리 조정에 반영
      setPosition({
        x: (e.clientX - dragStart.x) / scaleFactor,
        y: (e.clientY - dragStart.y) / scaleFactor,
      });
    } else {
      // 마우스가 움직일 때마다 커서 위치를 업데이트
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const xPos = ((e.clientX - rect.left) / rect.width) * 100;
      const yPos = ((e.clientY - rect.top) / rect.height) * 100;
      
      if (xPos >= 0 && xPos <= 100 && yPos >= 0 && yPos <= 100) {
        setCursorPosition({
          x: xPos / (zoom / 100), // 확대 비율에 따라 조정
          y: yPos / (zoom / 100),
        });
      } else {
        setCursorPosition(null); // 이미지 범위를 벗어나면 빨간 점을 숨김
      }
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex overflow-hidden" onWheel={handleWheel}>
      {/* 확대/축소 툴바 */}
      <div className="flex flex-col items-center mr-4 space-y-2">
        <button onClick={handleZoomIn} className="text-gray-500 hover:text-gray-700">
          <span role="img" aria-label="Zoom In">➕</span>
        </button>
        <span className="text-gray-700 font-semibold">{zoom}%</span>
        <button onClick={handleZoomOut} className="text-gray-500 hover:text-gray-700">
          <span role="img" aria-label="Zoom Out">➖</span>
        </button>
      </div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* 라벨 */}
            <div className="text-center text-gray-600 bg-gray-100 rounded-t-lg w-full py-1 font-semibold">
              {image.label}
            </div>
            {/* 이미지 */}
            <div
              className="w-full bg-gray-200 rounded-b-lg overflow-hidden shadow-md"
              onMouseDown={handleMouseDown} // 드래그 시작
              onMouseMove={handleMouseMove} // 드래그 중 위치 이동
              onMouseUp={handleMouseUp} // 드래그 종료
              onMouseLeave={() => setCursorPosition(null)} // 이미지 범위를 벗어날 때 빨간 점 숨김
            >
              <Image
                style={{
                  transform: `scale(${zoom / 100}) translate(${position.x}px, ${position.y}px)`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transformOrigin: 'center',
                }}
                src={image.src}
                alt={image.label}
                className="object-cover w-full h-full"
                height={1000}
                width={1000}
              />
              {/* 마우스 위치 표시 (모든 이미지에 동일 위치) */}
            </div>
            {/* {cursorPosition && (
              <div
                className="absolute w-1 h-1 bg-red-500 rounded-full pointer-events-none"
                style={{
                  top: `${cursorPosition.y}%`,
                  left: `${cursorPosition.x}%`,
                  transform: `translate(-50%, -50%)`,
                }}
              ></div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
