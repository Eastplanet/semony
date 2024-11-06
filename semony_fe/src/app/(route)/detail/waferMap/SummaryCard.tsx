// SummaryCard.tsx
import React from 'react';
import { Summary } from '@/app/mocks/wafer_map';

interface SummaryCardProps {
  data: Summary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => (
  <div className="bg-gray-100 shadow-md rounded-lg py-2 px-4 border-l-4 border-gray-300 flex " style={{ minWidth: "300px" }}>
    {/* Left Section: Summary Title */}
    <div className="flex-shrink-0  mr-4">
      <h3 className="font-semibold p-2 bg-gray-100   rounded-md text-gray-700 ">SUMMARY</h3>
    </div>
    {/* Right Section: Data Values */}
    <div className="flex flex-col text-gray-700 py-2">
      <p>Total Die: {data.totalDie}</p>
      <p>Defect Die: {data.defectDie}</p>
      <p>Defect Area: {data.defectArea}</p>
      <p>Defect Cnt: {data.defectCnt}</p>
    </div>
  </div>
);

export default SummaryCard;
