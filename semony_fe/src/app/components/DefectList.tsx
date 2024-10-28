// components/DefectList.tsx
import React from 'react';
import { DefectRecord } from '@/app/types';

interface DefectListProps {
  defectRecords: DefectRecord[];
}

const DefectList: React.FC<DefectListProps> = ({ defectRecords }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-3">Defect Records</h2>
      <ul className="space-y-2">
        {defectRecords.map((record, index) => (
          <li key={index} className="border-b pb-2">
            X: {record.XINDEX}, Y: {record.YINDEX}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DefectList;
