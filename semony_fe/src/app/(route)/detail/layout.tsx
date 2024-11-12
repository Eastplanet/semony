// src/app/detail/layout.tsx

'use client';
import React, { useState, useEffect } from 'react';
import WaferHeader from './WaferHeader';
import { useRouter, usePathname } from 'next/navigation';
import { DataProvider } from './DataContext';
import { useParams } from 'next/navigation';

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); 
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // 경로 파라미터 가져오기

  // Extract parameters and convert them to string if they exist
  const ppid = params.ppid as string;
  const lotId = params.lotId as string;
  const lotSeq = params.lotSeq as string;
  const slotNo = params.slotNo as string;


  // Handle tab change and route navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/detail/${ppid}/${lotId}/${decodeURIComponent(lotSeq)}/${slotNo}/${tab}`);
  };

  useEffect(() => {
    const currentTab = pathname.split('/').pop(); // 현재 경로에서 탭 추출
    if (currentTab) {
      setActiveTab(currentTab); // 현재 경로에 맞게 탭 설정
    }
  }, [pathname]);

  // Tabs array to simplify rendering
  const tabs = [
    { name: 'waferMap', label: 'WAFER MAP' },
    { name: 'macro', label: 'MACRO / GOLDEN' },
    { name: 'ebr', label: 'EBR' },
  ];

  return (
    <DataProvider ppid={ppid} lotId={lotId} lotSeq={decodeURIComponent(lotSeq)} slotNo={slotNo}>
    <div className="p-2 pt-1 h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <WaferHeader
            ppid={ppid}
            lotId={lotId}
            lotSeq={decodeURIComponent(lotSeq)}
            slotNo={slotNo}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-4 -mb-3 mr-10">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all duration-300 ease-in-out shadow-md 
                ${
                  activeTab === tab.name
                    ? 'bg-blue-600 text-white shadow-lg border-b-2 border-blue-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'
                }
              `}
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
