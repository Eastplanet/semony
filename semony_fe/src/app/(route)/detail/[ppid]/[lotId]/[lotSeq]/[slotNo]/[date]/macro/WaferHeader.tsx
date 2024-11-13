// src/app/ui/components/InfoCard.tsx

import React from 'react';
import Image from 'next/image';

interface InfoCardProps {
  ppid: string;
  lotId: string;
  lotSeq: string;
  slotNo: string;
}

const WaferHeader: React.FC<InfoCardProps> = ({ ppid, lotId, lotSeq, slotNo }) => {
  return (
    <div className="flex items-center rounded-2xl shadow-lg py-4 px-7 w-fit max-w-lg bg-gray-100 m-4">
      <div className="flex-shrink-0 mr-5">
        <Image src="/icons/wafer.png" alt="Wafer Icon" width={70} height={70} />
      </div>
      <div className="flex flex-col space-y-1 text-gray-800 text-xs">
        <div className="flex items-center">
          <span className="font-bold mr-4 min-w-[70px]">PPID</span>
          <span>{ppid}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-4 min-w-[70px]">LOT ID</span>
          <span>{lotId}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-4 min-w-[70px]">LOT Seq</span>
          <span>{lotSeq}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-4 min-w-[70px]">SLOT No</span>
          <span>{slotNo}</span>
        </div>
      </div>
    </div>
  );
};

export default WaferHeader;
