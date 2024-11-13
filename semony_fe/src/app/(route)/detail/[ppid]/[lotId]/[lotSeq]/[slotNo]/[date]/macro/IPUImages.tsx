// ImageGallery.tsx
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { DefectRecordSpec } from '@/app/types';
import {DataContext} from "../../../../../../DataContext"

interface IPUImagesProps {
  currentDefect: DefectRecordSpec[] | null;
}


const images = [
    { src: '/mocks/macro/0001_golden.TIF', label: "GOLDEN" },
    { src: '/mocks/macro/0001_ins.TIF', label: "INSPECTION" },
    { src: '/mocks/macro/0001_bin.TIF', label: "BINARIZE" },
    { src: '/mocks/macro/0001_psm.TIF', label: "PSM" },
  ];

const IPUImages: React.FC<IPUImagesProps> = ({ currentDefect }) => {
  const [zoom, setZoom] = useState(100); // 기본 확대율 100%
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 이미지 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedDefectIndex, setSelectedDefectIndex] = useState(0);

  useEffect(() => {
    if(currentDefect && currentDefect.length > 0){
      setSelectedDefectIndex(0);
      updateImagesForDefect(0);
    }
    setSelectedDefectIndex(0);
  }, [currentDefect]);
  
  const [currentImages, setCurrentImages] = useState(images);
  const dataContext = useContext(DataContext);
  if(!dataContext) {
    return null;
  }
  const { threeStepInfo, IPUImages } = dataContext;
  
  
  // 확대/축소 기능
  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 10, 500));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 10, 100));

 

  const updateImagesForDefect = (index: number) => {
    if(currentDefect){
      const selectedDefect = currentDefect[index];
    if(selectedDefect) {
      const { defectID, step } = selectedDefect;
      console.log(defectID, step)
      const matchingIpus = IPUImages[step]?.find((ipu)=> ipu.ipuNum === defectID);
      console.log(matchingIpus);
      // IPUImages에 matchingIpus가 없을 경우
      // IPUImages에 matchingIpus가 있을 경우ㅋ
      if(matchingIpus) {
        const labelMapping: { [key: string]: string } = {
          ins: 'INSPECTION',
          golden: 'GOLDEN',
          psm: 'PSM',
          bin: 'BINARIZE',
        };

        // 매칭된 이미지 리스트로 currentImages 설정
        setCurrentImages(
          matchingIpus.images.map((image) => {
            const labelKey = image.fileName.split('_')[1]; // [defectId]_[label] 형식에서 label 추출
            const label = labelMapping[labelKey] || labelKey;
            console.log(image.data);
            return { src: `data:image/png;base64,${image.data}`, label };
          }));
      }
    }
    

      // setCurrentImages(
      //   IPUImages[defectStep]
      // )
      // setCurrentImages(
      //   images.map((image) => ({
      //       src: '/mocks/macro/0001_golden.TIF',
      //       label: image.label,
      //     }))
      // )
    }
  }
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
    } 
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDefectSelection = (index: number) => {
    setSelectedDefectIndex(index);
    updateImagesForDefect(index);
    setZoom(100);
  };
  return (
    <div
      className="bg-white p-3 shadow-md rounded-lg flex overflow-auto h-fit border border-1 border-gray-200"
    >
    <div
        className="flex flex-col items-start mr-4 w-48 space-y-2 overflow-y-auto h-[55vh]"
        style={{
          scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
          msOverflowStyle: 'none', // IE와 Edge에서 스크롤바 숨김
        }}
      >
        {currentDefect && currentDefect.map((defect, index) => (
          <button
            key={index}
            onClick={() => handleDefectSelection(index)}
            className={`p-2 w-full rounded-lg border ${
              index === selectedDefectIndex ? 'bg-gray-700 border-gray-300 shadow-md text-gray-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-200'
            }  transition-all text-left`}
          >
            <div className={`${
              index === selectedDefectIndex ? "text-white font-bold " :"" } font-semibold  text-xs`} > {threeStepInfo[defect.step - 1]?.moduleId || 'N/A'} (ID: {defect.defectID})</div>
            <div className="text-xs ">gray_mean: {defect.grayMean}</div>
            <div className="text-xs ">
              gray_range: {defect.grayMin} - {defect.grayMax}
            </div>
            <div className="text-xs  mt-1">size (x, y): {defect.xsize} x {defect.ysize}</div>
          </button>
        ))}
      </div>



      {/* 이미지 그리드 */}
      <div className="grid grid-cols-2 gap-4 w-full h-full" onWheel={handleWheel}>
        {currentImages.slice(0, 4).map((image, index) => (
          <div key={index} className="relative flex flex-col items-center">
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
      <div className="flex flex-col items-center ml-4 space-y-2 text-sm">
        <button onClick={handleZoomIn} className="text-gray-500 hover:text-gray-700">
          <span role="img" aria-label="Zoom In">➕</span>
        </button>
        <span className="text-gray-700 font-semibold">{zoom}%</span>
        <button onClick={handleZoomOut} className="text-gray-500 hover:text-gray-700">
          <span role="img" aria-label="Zoom Out">➖</span>
        </button>
      </div>

    </div>
  );
};

export default IPUImages;
