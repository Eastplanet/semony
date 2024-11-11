'use client'
import React from 'react';
import MacroImage from './MacroImage';
import MenuBar from './MenuBar';

const MacroPage: React.FC = () => {

 

  return (
    <div>
      
      <MacroImage src="/mocks/macro/macro_example.BMP" alt="Wafer Map" />
      <MenuBar />
    </div>
  );
};

export default MacroPage;
