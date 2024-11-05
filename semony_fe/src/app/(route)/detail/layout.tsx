// src/app/detail/layout.tsx

'use client';
import React, { useState } from 'react';
import WaferHeader from './WaferHeader';
import { useRouter } from 'next/navigation';
import { DataProvider } from './DataContext';

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('waferMap');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/detail/${tab}`);
  };

  return (
    <DataProvider>
    <div className="p-6 pt-1">
      {/* Header and Tabs Container */}
      <div className="flex justify-between items-center ">
        {/* Wafer Header */}
        <div>
          <WaferHeader
            ppid="0TT_EWIM_NO_CHHP"
            lotId="LP22024100315_PJ2@89654577"
            lotSeq="727939436"
            slotNo="2"
          />
        </div>

        {/* Tabs (aligned to the right, adjusted positioning) */}
        <div className="flex space-x-2 -mb-4  mr-10">
          <button
            onClick={() => handleTabChange('waferMap')}
            className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'waferMap' ? 'bg-gray-300 border-2 border-gray-600' : 'bg-gray-200'}`}
          >
            WAFER MAP
          </button>
          <button
            onClick={() => handleTabChange('macro')}
            className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'macro' ? 'bg-gray-300 border-2 border-gray-600' : 'bg-gray-200'}`}
          >
            MACRO
          </button>
          <button
            onClick={() => handleTabChange('golden')}
            className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'golden' ? 'bg-gray-300 border-2 border-gray-600' : 'bg-gray-200'}`}
          >
            GOLDEN
          </button>
          <button
            onClick={() => handleTabChange('ebr')}
            className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === 'ebr' ? 'bg-gray-300 border-2 border-gray-600' : 'bg-gray-200'}`}
          >
            EBR
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border-2 border-gray-600 shadow-md rounded-3xl p-4 h-full">
        {children}
      </div>
    </div>
    </DataProvider>
  );
};

export default DetailLayout;
