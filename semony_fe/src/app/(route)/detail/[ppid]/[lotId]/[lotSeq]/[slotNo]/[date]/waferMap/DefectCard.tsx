// DefectCard.tsx
import React, { useContext } from 'react';
import { DataContext } from '../../../../../../DataContext'; // DataContext 가져오기
import { stepInfo } from '@/app/types';

interface DefectCardProps {
  data: stepInfo & { step: number }; // DefectInfo에 step 속성을 추가
  index: number;
}

const DefectCard: React.FC<DefectCardProps> = ({ data, index }) => {
  const context = useContext(DataContext); // Context 사용

  // context가 undefined일 때 처리
  if (!context) {
    return null; // 또는 로딩 스피너 같은 것을 반환
  }

  const { toggleStep, selectedSteps } = context; // context가 undefined가 아닐 때 사용

  const handleClick = () => {
    toggleStep(data.step); // DefectInfo에서 step을 가져옴
  };

  // 색상 배열로 인덱스에 따라 색상 지정
  const colors = ["bg-blue-200", "bg-red-200", "bg-green-200"];
  const cardColor = selectedSteps.includes(data.step) ? colors[index] : "bg-white"; // 선택된 스텝에 따라 색상 변경

  return (
    <div
      className={`shadow-md rounded-lg py-2 px-4 ${cardColor} cursor-pointer transition-colors font-light text-xs`}
      onClick={handleClick}
      style={{ minWidth: "250px" }}
    >
      <div className="flex flex-row items-center">
        <h3 className="text-gray-700 text-sm font-semibold">{data.moduleId}</h3>
        <p className="text-xs text-gray-600 p-1">({data.eventDtts})</p>
      </div>
      <p>defect_count: <span className="font-semibold">{data.defectCnt}</span></p>
      <p>defect_die_count: <span className="font-semibold">{data.defectDieCnt}</span></p>
      <p>total_die_count: <span className="font-semibold">{data.nDie}</span></p>
      <p>defect_area: <span className="font-semibold">{data.defDensity}%</span></p>
      
    </div>
  );
};

export default DefectCard;
