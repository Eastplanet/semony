// SummarySection.tsx
import React from 'react';
import DefectCard from './DefectCard';
import { DefectInfo } from '@/app/mocks/wafer_map';

interface SummarySectionProps {
  defectData: DefectInfo[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ defectData }) => (
  <div className="flex space-x-4 p-4 overflow-x-auto text-xs justify-center">
    {defectData.map((data, index) => (
      <DefectCard key={data.moduleId} data={{ ...data, step: index + 1 }} index={index} /> // step을 인덱스로 설정
    ))}
  </div>
);

export default SummarySection;
