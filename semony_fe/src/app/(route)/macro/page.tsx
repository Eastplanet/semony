'use client'
import React, { useState } from 'react';
import MacroImage from './components/MacroImage';
import WaferHeader from './components/WaferHeader';
import MenuBar from './components/MenuBar';

const MacroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('waferMap');

  const renderContent = () => {
    switch (activeTab) {
      case 'waferMap':
        return <MacroImage src="/mocks/macro/macro_example.BMP" alt="Wafer Map" />;
      case 'macro':
        return <p className="text-center text-gray-700">Macro Content</p>;
      case 'golden':
        return <p className="text-center text-gray-700">Golden Content</p>;
      case 'ebr':
        return <p className="text-center text-gray-700">EBR Content</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      <WaferHeader ppid="0TT_EWIM_NO_CHHP" lotId="LP22024100315_PJ2@89654577" lotSeq="727939436" slotNo="2" />
      
      <div id="container" className="m-3 p-3">
        {/* Tab Buttons */}
        <div className="flex space-x-2 mb-0">
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'waferMap' ? 'bg-gray-300' : 'bg-gray-200'} font-semibold`}
            onClick={() => setActiveTab('waferMap')}
          >
            WAFER MAP
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'macro' ? 'bg-gray-300' : 'bg-gray-200'} font-semibold`}
            onClick={() => setActiveTab('macro')}
          >
            MACRO
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'golden' ? 'bg-gray-300' : 'bg-gray-200'} font-semibold`}
            onClick={() => setActiveTab('golden')}
          >
            GOLDEN
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'ebr' ? 'bg-gray-300' : 'bg-gray-200'} font-semibold`}
            onClick={() => setActiveTab('ebr')}
          >
            EBR
          </button>
        </div>


        {/* Tab Content */}
        <div className="p-4 border-t border-gray-300">{renderContent()}</div>
        
        {/* Menu Bar */}
        <MenuBar />
      </div>
    </div>
  );
};

export default MacroPage;
