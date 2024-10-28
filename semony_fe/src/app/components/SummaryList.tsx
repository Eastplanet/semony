// components/SummaryList.tsx
import React from 'react';

interface SummaryListProps {
  dieCount: number;
  defectCount: number;
}

const SummaryList: React.FC<SummaryListProps> = ({ dieCount, defectCount }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-3">Summary</h2>
      <ul className="space-y-2">
        <li>Total Die Locations: {dieCount}</li>
        <li>Total Defects: {defectCount}</li>
      </ul>
    </div>
  );
};

export default SummaryList;
