// StepList.tsx
import React from 'react';
import { DefectRecord } from '../types';

interface StepListProps {
  defects: DefectRecord[];
}

export default function StepList({ defects }: StepListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Defect List</h2>
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-xs">
            <th className="py-2 px-4 ">ID</th>
            <th className="py-2 px-4 ">Alg</th>
            <th className="py-2 px-4 ">X Rel</th>
            <th className="py-2 px-4 ">Y Rel</th>
            <th className="py-2 px-4 ">Area</th>
            <th className="py-2 px-4 ">X Size</th>
            <th className="py-2 px-4 ">Y Size</th>
            <th className="py-2 px-4 ">X Index</th>
            <th className="py-2 px-4 ">Y Index</th>
            <th className="py-2 px-4 ">GDS X</th>
            <th className="py-2 px-4 ">GDS Y</th>
            <th className="py-2 px-4 ">Gray Max</th>
            <th className="py-2 px-4 ">Gray Min</th>
            <th className="py-2 px-4 ">Gray Mean</th>
            <th className="py-2 px-4 ">Radius</th>
          </tr>
        </thead>
        <tbody>
          {defects.map((defect) => (
            <tr key={defect.id} className="text-center text-sm -t  overflow-scroll">
              <td className="py-2 px-4 ">{defect.id}</td>
              <td className="py-2 px-4 ">{defect.alg}</td>
              <td className="py-2 px-4 ">{defect.xrel}</td>
              <td className="py-2 px-4 ">{defect.yrel}</td>
              <td className="py-2 px-4 ">{defect.area}</td>
              <td className="py-2 px-4 ">{defect.xsize}</td>
              <td className="py-2 px-4 ">{defect.ysize}</td>
              <td className="py-2 px-4 ">{defect.XINDEX}</td>
              <td className="py-2 px-4 ">{defect.YINDEX}</td>
              <td className="py-2 px-4 ">{defect.gdsx}</td>
              <td className="py-2 px-4 ">{defect.gdsy}</td>
              <td className="py-2 px-4 ">{defect.gray_max}</td>
              <td className="py-2 px-4 ">{defect.gray_min}</td>
              <td className="py-2 px-4 ">{defect.gray_mean}</td>
              <td className="py-2 px-4 ">{defect.radius}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
