// SummarySection.tsx
import React from 'react';
import SummaryCard from './SummaryCard';
import DefectCard from './DefectCard';
import { Summary, DefectInfo } from '@/app/mocks/wafer_map';

interface SummarySectionProps {
  summaryData: Summary;
  defectData: DefectInfo[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ summaryData, defectData }) => (
  <div className="flex space-x-4 p-4 overflow-x-auto text-xs justify-center">
    {/* Summary Card */}
    <SummaryCard data={summaryData} />
    
    {/* Defect Cards */}
    {defectData.map((data, index) => (
      <DefectCard key={data.moduleId} data={data} index={index} />
    ))}
  </div>
);

export default SummarySection;
