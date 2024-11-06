// DefectCard.tsx
import React, { useState } from 'react';
import { DefectInfo } from '@/app/mocks/wafer_map';

interface DefectCardProps {
  data: DefectInfo;
  index: number;
}

const DefectCard: React.FC<DefectCardProps> = ({ data, index }) => {
  const [isSelected, setIsSelected] = useState(false);

  // 색상 배열로 인덱스에 따라 색상 지정
  const colors = ["bg-blue-200", "bg-red-200", "bg-green-200"];
  const cardColor = isSelected ? colors[index] : "bg-white";

  const handleClick = () => setIsSelected((prev) => !prev);

  return (
    <div
      className={`shadow-md rounded-lg py-2 px-4 ${cardColor} cursor-pointer transition-colors`}
      onClick={handleClick}
      style={{ minWidth: "250px" }}
    >
      <div className="flex flex-row items-center">
      <h3 className=" text-gray-700 text-sm font-semibold">{data.moduleId}</h3>
      <p className="text-xs text-gray-600 p-1">({data.timestamp})</p>
      </div >
      <p>Defect Die: {data.defectDie}</p>
      <p>Defect Area: {data.defectArea}</p>
      <p>Defect Cnt: {data.defectCnt}</p>
    </div>
  );
};

export default DefectCard;
