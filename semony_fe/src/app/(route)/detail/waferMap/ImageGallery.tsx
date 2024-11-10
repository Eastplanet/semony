// ImageGallery.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DefectRecordSpec } from '@/app/mocks/defect_record';

interface ImageGalleryProps {
  currentDefects: { x: number; y: number; defects: DefectRecordSpec[] } | null;
}

const images = [
    { src: '/mocks/macro/0001_golden.TIF', label: "GOLDEN" },
    { src: '/mocks/macro/0001_ins.TIF', label: "INSPECTION" },
    { src: '/mocks/macro/0001_bin.TIF', label: "BINARIZE" },
    { src: '/mocks/macro/0001_psm.TIF', label: "PSM" },
  ];

const ImageGallery: React.FC<ImageGalleryProps> = ({ currentDefects }) => {
  const [zoom, setZoom] = useState(100); // 기본 확대율 100%
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 이미지 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedDefectIndex, setSelectedDefectIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState(images);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  
  
  // 확대/축소 기능
  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 10, 500));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 10, 100));

  useEffect(() => {
    if(currentDefects?.defects && currentDefects.defects.length > 0){
      setSelectedDefectIndex(0);
      updateImagesForDefect(0);
    }
  }, []);

  const updateImagesForDefect = (index: number) => {
    const selectedDefect = currentDefects?.defects[index];
    if(selectedDefect) {
      setCurrentImages(
        images.map((image) => ({
            src: '/mocks/macro/0001_golden.TIF',
            label: image.label,
          }))
      )
    }
  }
  
  const handleDefectSelection = (index: number) => {
    setSelectedDefectIndex(index);
    updateImagesForDefect(index);
    setZoom(100);
  };

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
    <div
      className="bg-white p-4 shadow-md rounded-lg flex overflow-hidden h-[70vh]  border border-1 border-gray-200 "
    >
      <div className="flex flex-col items-start mr-4 w-64 space-y-2">
        {currentDefects?.defects.map((defect, index) => (
          <button
            key={index}
            onClick={() => handleDefectSelection(index)}
            className={`py-2 px-4 w-full rounded-lg border ${
              index === selectedDefectIndex ? 'bg-blue-200 border-blue-400' : 'bg-gray-50 border-gray-200'
            } shadow-md hover:shadow-lg transition-all text-left`}
          >
            <div className="font-semibold text-gray-800 text-sm">Step: {defect.step}</div>
            <div className="text-xs text-gray-600">Defect ID: {defect.defectID}</div>
            <div className="text-xs text-gray-600">Area: {defect.defectArea}</div>
            <div className="text-xs text-gray-600">Radius: {defect.radius}</div>
            <div className="text-xs text-gray-600">Gray Mean: {defect.grayMean}</div>
            <div className="text-xs text-gray-600">
              Gray Range: {defect.grayMin} - {defect.grayMax}
            </div>
            <div className="text-xs text-gray-600 mt-1">Size (X, Y): {defect.xsize} x {defect.ysize}</div>
          </button>
        ))}
      </div>


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
      <div className="grid grid-cols-2 gap-4 w-fit h-fit" onWheel={handleWheel}>
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative flex flex-col items-center w-full h-full">
            {/* 라벨 */}
            <div className="text-center text-gray-600 bg-gray-100 rounded-t-lg w-full py-1 font-semibold">
              {image.label}
            </div>
            {/* 이미지 */}
            <div
              className="w-full h-full bg-gray-200 rounded-b-lg overflow-hidden shadow-md"
              onMouseDown={handleMouseDown} // 드래그 시작
              onMouseMove={handleMouseMove} // 드래그 중 위치 이동
              onMouseUp={handleMouseUp} // 드래그 종료
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
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
