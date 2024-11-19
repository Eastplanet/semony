// src/app/ui/components/ZoomMenuBar.tsx

import React from 'react';
import Image from 'next/image';

const MenuBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between rounded-full shadow-lg bg-gray-200 px-4 py-2 w-full max-w-xs m-2 mt-6">
      <button className="p-2 hover:bg-gray-300 rounded-full">
        <Image src="/icons/zoomOut.png" alt="Zoom Out" width={20} height={20} />
      </button>
      <button className="p-2 hover:bg-gray-300 rounded-full">
        <Image src="/icons/zoomIn.png" alt="Zoom In" width={20} height={20} />
      </button>
      <span className="text-sm font-semibold text-gray-800">100%</span>
      <button className="p-2 hover:bg-gray-300 rounded-full">
        <Image src="/icons/fullScreen.png" alt="Full Screen" width={20} height={20} />
      </button>
    </div>
  );
};

export default MenuBar;
