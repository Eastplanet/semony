'use client';
import React, { useContext, useState } from 'react';
import { DataContext } from '@/app/(route)/detail/DataContext';
import IPUImages from './IPUImages';
import { DefectRecordSpec } from '@/app/types';
import DefectImage from './DefectImage';

const MacroPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [currentDefect, setCurrentDefect] = useState<DefectRecordSpec[] | null>(null);
  const [isDefectListOpen, setIsDefectListOpen] = useState(false);

  const dataContext = useContext(DataContext);
  if (!dataContext) return null;

  const { mainImages, threeStepInfo, defectRecordsStep1, defectRecordsStep2, defectRecordsStep3 } = dataContext;

  const handleStepChange = (value: number) => {
    setStep(value);
  };

  // Select defect records based on the current step
  const defectRecords = step === 0 ? defectRecordsStep1 : step === 1 ? defectRecordsStep2 : defectRecordsStep3;

  // Define setDefects to update currentDefect
  const setDefects = (defects: DefectRecordSpec[]) => {
    if (defects.length > 0) {
      setCurrentDefect(defects);
    }
  };

  return (
    <div className="p-3">
      {/* Step Selector */}
      <div className="flex mb-6 items-center">
        <label htmlFor="step-select" className="mr-4 text-lg font-semibold text-gray-700">
          MODULE:
        </label>
        <div className="flex space-x-4">
          {threeStepInfo.map((info, index) => (
            <button
              key={index}
              onClick={() => handleStepChange(index)}
              className={`px-4 py-2 rounded-md shadow-md font-medium transition-colors duration-200 ${
                step === index
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {info.moduleId}
            </button>
          ))}
          <button
            onClick={() => setIsDefectListOpen(true)}
            className="px-4 py-2 bg-gray-600 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ml-4"
          >
            결함 리스트 전체 조회
          </button>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex flex-col md:flex-row justify-start gap-6">
        <div className="w-1/3">
          <DefectImage
            defects={defectRecords}
            src={`data:image/bmp;base64,${mainImages[step]?.macro?.data || ''}`}
            alt={`Macro Image for Step ${step}`}
            setDefects={setDefects}
          />
          <p className="text-center font-extrabold mt-2 text-white bg-gray-600 rounded-xl items-center py-2 shadow-lg">MACRO</p>
        </div>
        <div className="w-1/3">
          {(defectRecords.length > 0) ? <DefectImage
            defects={defectRecords}
            src={`data:image/bmp;base64,${mainImages[step]?.golden?.data || ''}`}
            alt={`Golden Image for Step ${step}`}
            setDefects={setDefects}
          /> : <DefectImage
          defects={defectRecords}
          src="/golden_default.png"
          alt={`Golden Image for Step ${step}`}
          setDefects={setDefects}
        />}
          <p className="text-center font-extrabold mt-2 text-white bg-gray-600 rounded-xl items-center py-2 shadow-lg">GOLDEN</p>
        </div>
        <IPUImages currentDefect={currentDefect} />
      </div>

      {/* Defect List Modal */}
      {isDefectListOpen && (
        // Surrounding overlay div for the modal
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
  onClick={() => setIsDefectListOpen(false)} // Close the modal when clicking on the overlay
>
  {/* Modal content */}
  <div
    className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-7 relative"
    onClick={(e) => e.stopPropagation()} // Prevent the click event from reaching the overlay when clicking inside the modal content
  >
    <button
      onClick={() => setIsDefectListOpen(false)}
      className="absolute top-7 right-7 text-gray-600 hover:text-gray-800"
    >
      ✖
    </button>
    <h3 className="font-semibold text-gray-700 mb-4">Defect List for <span className="font-extrabold text-lg">{threeStepInfo[step].moduleId}</span></h3>
    <div className="max-h-80 overflow-y-auto">
      <ul className="space-y-2 grid grid-cols-3 md:grid-cols-3 gap-4">
        {defectRecords.map((defect, index) => (
          <li
            key={index}
            onClick={() => {
              setDefects([defect]);
              setIsDefectListOpen(false); // Close modal after selection
            }}
            className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 shadow-sm"
          >
            <p className="text-sm font-semibold">Defect ID: <span className="text-blue-600">{defect.defectID}</span></p>
            <p className="text-xs text-gray-600 mt-1">Area: <span>{defect.defectArea}</span></p>
            <p className="text-xs text-gray-600 mt-1">Gray Min-Max: <span>{defect.grayMin} - {defect.grayMax}</span></p>
            <p className="text-xs text-gray-600 mt-1">Mean Gray: <span>{defect.grayMean}</span></p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

      )}
    </div>
  );
};

export default MacroPage;
