// components/DieLocationList.tsx
import React from 'react';
import { DieLocation } from '@/app/types';

interface DieLocationListProps {
  dieLocations: DieLocation[];
}

const DieLocationList: React.FC<DieLocationListProps> = ({ dieLocations }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-3">Die Locations</h2>
      <ul className="space-y-2">
        {dieLocations.map((location, index) => (
          <li key={index} className="border-b pb-2">
            X: {location.XINDEX}, Y: {location.YINDEX}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DieLocationList;
