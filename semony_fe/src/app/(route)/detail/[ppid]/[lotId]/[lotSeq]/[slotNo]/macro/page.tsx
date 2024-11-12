// src/app/detail/MacroPage.tsx

'use client';
import React, { useContext, useState } from 'react';
import MacroImage from './MacroImage';
import MenuBar from './MenuBar';
import { DataContext } from '@/app/(route)/detail/DataContext';
import IPUImages from './IPUImages';
import { DefectRecordSpec } from '@/app/types';

const MacroPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [currentDefect, setCurrentDefect] = useState<DefectRecordSpec | null>(null);
  const [isDefectListOpen, setIsDefectListOpen] = useState(true);

  const dataContext = useContext(DataContext);
  if (!dataContext) return null;

  const { mainImages, threeStepInfo, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3 } = dataContext;

  const handleStepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStep = parseInt(event.target.value);
    setStep(selectedStep);
    setCurrentDefect(null); // Reset current defect when changing steps
  };

  // Select defect records based on the current step
  const defectRecords = step === 0 ? defectRecordsStep1 : step === 1 ? defectRecordsStep2 : defectRecordsStep3;

  return (
    <div className="p-3">
      {/* Step Selector */}
      <div className="flex mb-6">
        <label htmlFor="step-select" className="mr-2 font-semibold text-gray-700 pt-2">
          모듈 선택
        </label>
        <select
          id="step-select"
          value={step}
          onChange={handleStepChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {threeStepInfo.map((info, index) => (
            <option key={index} value={index}>
              {info.moduleId}
            </option>
          ))}
        </select>
      </div>

      {/* Images Section */}
      <div className="flex flex-col md:flex-row justify-start gap-6">
        <div className="">
          <MacroImage
            src={`data:image/png;base64,${mainImages[step]?.macro?.data || ''}`}
            alt={`Macro Image for Step ${step}`}
          />
          <p className="text-center mt-2 text-gray-600">Macro Image</p>
        </div>
        <div className="">
          <MacroImage
            src={`data:image/png;base64,${mainImages[step]?.golden?.data || ''}`}
            alt={`Golden Image for Step ${step}`}
          />
          <p className="text-center mt-2 text-gray-600">Golden Image</p>
        </div>
        <IPUImages currentDefect={currentDefect} />
      </div>

      {/* Defect List Toggle */}
      <div className="mt-8">
        <button
          onClick={() => setIsDefectListOpen((prev) => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {isDefectListOpen ? 'Hide Defect List' : 'Show Defect List'}
        </button>
      </div>

      {/* Defect List */}
      {isDefectListOpen && (
        <div className="mt-4 border border-gray-300 rounded-lg shadow-md p-4 max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-2">Defect List for Step {step + 1}</h3>
          <ul className="space-y-2">
            {defectRecords.map((defect, index) => (
              <li
                key={index}
                onClick={() => setCurrentDefect(defect)}
                className="p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150"
              >
                <span className="font-semibold">Defect ID:</span> {defect.defectID}
                <span className="ml-2 text-sm text-gray-600">(Area: {defect.defectArea})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* IPU Images */}
     
    </div>
  );
};

export default MacroPage;
