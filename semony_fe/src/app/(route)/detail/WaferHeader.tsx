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
    <div className="flex items-center rounded-2xl shadow-lg py-2 px-7 w-full bg-gray-100 m-2 ml-12">
      <div className="flex-shrink-0 mr-5">
        <Image src="/icons/wafer.png" alt="Wafer Icon" width={30} height={30} />
      </div>
      <div className="flex text-gray-800 text-xs">
        <div className="flex items-center mr-4">
          <span className="font-bold mr-2 w-fit ">PPID : </span>
          <span>{ppid}</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="font-bold mr-2 w-fit ">LOT_ID : </span>
          <span>{lotId}</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="font-bold mr-2 w-fit ">LOT_Seq : </span>
          <span>{lotSeq}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-2 w-fit ">SLOT_No : </span>
          <span>{slotNo}</span>
        </div>
      </div>
    </div>
  );
};

export default WaferHeader;
