// SummarySection.tsx
import React from 'react';
import DefectCard from './DefectCard';
import { stepInfo } from '@/app/types';

interface SummarySectionProps {
  defectData: stepInfo[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ defectData }) => (
  <div className="flex space-x-4 p-2 overflow-x-auto text-xs justify-center">
    {defectData.map((data, index) => (
      <DefectCard key={data.moduleId} data={{ ...data, step: index + 1 }} index={index} /> // step을 인덱스로 설정
    ))}
  </div>
);

export default SummarySection;
