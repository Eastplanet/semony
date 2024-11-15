// src/app/detail/layout.tsx

'use client';
import React, { useState, useEffect } from 'react';
import WaferHeader from './WaferHeader';
import { useRouter, usePathname } from 'next/navigation';
import { DataProvider } from './DataContext';
import { useParams } from 'next/navigation';
import HealthModal from './HealthModal';

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); 
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const ppid = params.ppid as string;
  const lotId = params.lotId as string;
  const lotSeq = params.lotSeq as string;
  const slotNo = params.slotNo as string;
  const date = params.date as string;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/detail/${ppid}/${lotId}/${decodeURIComponent(lotSeq)}/${slotNo}/${date}/${tab}`);
  };

  useEffect(() => {
    const currentTab = pathname.split('/').pop();
    if (currentTab) {
      setActiveTab(currentTab); 
    }
  }, [pathname]);

  const tabs = [
    { name: 'waferMap', label: 'WAFER MAP' },
    { name: 'macro', label: 'MACRO / GOLDEN' },
    { name: 'ebr', label: 'EBR' },
  ];

  return (
    <DataProvider date={date} ppid={ppid} lotId={lotId} lotSeq={decodeURIComponent(lotSeq)} slotNo={slotNo}>
      <div className="p-2 pt-1 h-[100vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <WaferHeader
              ppid={ppid}
              lotId={lotId}
              lotSeq={decodeURIComponent(lotSeq)}
              slotNo={slotNo}
            />
            <button
              onClick={() => setIsHealthModalOpen(true)}
              className="text-xs font-medium text-white px-4 text-center bg-blue-500 rounded-2xl py-2 shadow-md"
            >
              모듈 네트워크<br/>상태 확인
            </button>
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

        <div className="bg-white border-2 border-gray-300 shadow-lg rounded-3xl p-3 md:p-4 h-fit">
          {children}
        </div>

        {/* Health Modal */}
        {isHealthModalOpen && <HealthModal onClose={() => setIsHealthModalOpen(false)} />}
      </div>
    </DataProvider>
  );
};

export default DetailLayout;
