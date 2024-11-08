// src/app/detail/layout.tsx

'use client';
import React, { useState, useEffect } from 'react';
import WaferHeader from './WaferHeader';
import { useRouter, usePathname } from 'next/navigation';
import { DataProvider } from './DataContext';

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); 
  const router = useRouter();
  const pathname = usePathname();

  // Handle tab change and route navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/detail/${tab}`);
  };

  // Update activeTab based on the current path

  useEffect(() => {
    const currentTab = pathname.split('/').pop(); // 현재 경로에서 탭 추출
    if (currentTab) {
      setActiveTab(currentTab); // 현재 경로에 맞게 탭 설정
    }
  }, [pathname]);

  // Tabs array to simplify rendering
  const tabs = [
    { name: 'waferMap', label: 'WAFER MAP' },
    { name: 'macro', label: 'MACRO' },
    { name: 'golden', label: 'GOLDEN' },
    { name: 'ebr', label: 'EBR' },
  ];

  return (
    <DataProvider>
      <div className="p-4 md:p-6 pt-1 h-screen overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Wafer Header */}
          <div className="mb-4 md:mb-0">
            <WaferHeader
              ppid="0TT_EWIM_NO_CHHP"
              lotId="LP22024100315_PJ2@89654577"
              lotSeq="727939436"
              slotNo="2"
            />
          </div>
  
          {/* Tabs */}
          <div className="flex space-x-2 -mb-5 mr-4 md:-mb-5 sm:-mb-0 sm: ml-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={`px-auto py-2 text-sm md:px-4 md:py-2 md:text-xs overflow-hidden h-10 font-semibold rounded-t-lg transition-colors ${
                  activeTab === tab.name
                    ? 'bg-gray-300 border-2 border-gray-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
  
        <div className="bg-white border-2 border-gray-600 shadow-md rounded-3xl p-3 md:p-4 h-fit"> 
          {children}
        </div>
      </div>
    </DataProvider>
  );
};

export default DetailLayout;
