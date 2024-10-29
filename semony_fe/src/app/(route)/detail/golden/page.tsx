// src/app/detail/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';

const DetailPage: React.FC = () => {
  return (
    <div className="flex p-6 space-x-4 bg-gray-100 rounded-xl shadow-lg">
      {/* Left Section */}
      <div className="flex flex-col items-center w-3/5 space-y-4">
        {/* Step Buttons */}
        <div className='flex flex-row'>
        <div className="flex flex-col space-y-2 mr-4 min-w-24">
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full">STEP 1</button>
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full">STEP 2</button>
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full">STEP 3</button>
        </div>

        {/* Wafer Image */}
        <div className="relative w-full h-full bg-gray-200 rounded-full flex justify-center items-center shadow-md">
          <Image
            src="/icons/wafer.png" // 임시 경로
            alt="Wafer Image"
            width={450}
            height={450}
            className="object-cover rounded-full"
          />
          {/* Fullscreen Icon */}
          <div className="absolute top-2 right-2 cursor-pointer">
            <Image src="/icons/fullscreen.png" alt="Fullscreen Icon" width={24} height={24} />
          </div>
        </div>
        </div>

        {/* Defect List */}
        <div className="flex flex-wrap items-center justify-center w-full px-2 py-2 mt-4 space-x-2 bg-blue-200 rounded-md text-xs text-blue-700 font-semibold">
          <span>ID</span>
          <span>ALG</span>
          <span>XREL</span>
          <span>AREA</span>
          <span>YREL</span>
          <span>XSIZE</span>
          <span>YSIZE</span>
          <span>XINDEX</span>
          <span>YINDEX</span>
          <span>GDSX</span>
          <span>GDSY</span>
          <span>GRAY_MAX</span>
          <span>GRAY_MIN</span>
          <span>GRAY_MEAN</span>
          <span>RADIUS</span>
        </div>
        <div className="w-full px-4 py-2 bg-blue-300 rounded-md"></div>
      </div>

      {/* Right Section */}
      <div className="w-2/5 grid grid-cols-2 gap-4">
        {/* Image Boxes */}
        <div className="flex flex-col items-center p-2 bg-gray-300 rounded-md">
          <p className="mb-2 font-semibold">GOLDEN</p>
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-300 rounded-md">
          <p className="mb-2 font-semibold">INSPECTION</p>
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-300 rounded-md">
          <p className="mb-2 font-semibold">BINARIZE</p>
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-300 rounded-md">
          <p className="mb-2 font-semibold">PSM</p>
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        </div>

        {/* Zoom Menu Bar */}
        <div className="flex items-center justify-center w-full space-x-2 p-2 bg-gray-200 rounded-full">
          <button className="p-1 hover:bg-gray-300 rounded-full">
            <Image src="/icons/zoomOut.png" alt="Zoom Out" width={16} height={16} />
          </button>
          <button className="p-1 hover:bg-gray-300 rounded-full">
            <Image src="/icons/zoomIn.png" alt="Zoom In" width={16} height={16} />
          </button>
          <span className="text-sm font-semibold text-gray-800">100%</span>
          <button className="p-1 hover:bg-gray-300 rounded-full">
            <Image src="/icons/fullScreen.png" alt="Full Screen" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
