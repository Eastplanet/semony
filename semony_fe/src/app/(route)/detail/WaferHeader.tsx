// src/app/ui/components/InfoCard.tsx

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface InfoCardProps {
  ppid: string;
  lotId: string;
  lotSeq: string;
  slotNo: string;
}

const WaferHeader: React.FC<InfoCardProps> = ({ ppid, lotId, lotSeq, slotNo }) => {
  const router = useRouter();

  // 뒤로 가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    router.push('/'); 
  };

  return (
    <div className='flex my-2'> 
      <button onClick={handleBackClick} className="flex-shrink-0 p-2 ml-3 rounded-full">
          <Image src="/back.svg" alt="Back Icon" width={32} height={32} />
        </button>
      <div className="flex items-center rounded-2xl shadow-lg py-2 px-5 w-full bg-gray-200 m-2">
     
        <div className="flex text-gray-800 text-sm py-1 px-3">
          <div className="flex items-center mr-4">
            <span className="font-bold mx-2 w-fit ">PPID :</span>
            <span>{ppid}</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="font-bold mx-2 w-fit ">LOT_ID :</span>
            <span>{lotId}</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="font-bold mx-2 w-fit ">LOT_Seq :</span>
            <span>{lotSeq}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mx-2 w-fit ">SLOT_No :</span>
            <span>{slotNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaferHeader;
