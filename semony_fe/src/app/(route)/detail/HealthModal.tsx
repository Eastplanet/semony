// src/app/detail/HealthModal.tsx
'use client';
import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';

interface HealthModalProps {
  onClose: () => void;
}

const HealthModal: React.FC<HealthModalProps> = ({ onClose }) => {
  const dataContext = useContext(DataContext);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  if (!dataContext) return null;

  const { healthData } = dataContext;

  // Step별로 모듈을 그룹화
  const groupedModules = {
    step1: healthData.filter((module) => ['MIW7-51', 'MIW7-52'].includes(module.moduleId)),
    step2: healthData.filter((module) =>
      ['EWIM1-36', 'EWIM1-46', 'EWIM2-36', 'EWIM2-46'].includes(module.moduleId)
    ),
    step3: healthData.filter((module) => ['MIW7-61', 'MIW7-62'].includes(module.moduleId)),
  };

  const handleClickOutside = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold">모듈 네트워크 상태</h2>
          <div
            className="relative ml-2"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <span className="px-2 py-1 rounded-xl text-[10px] font-semibold cursor-pointer bg-opacity-40 bg-gray-600 text-white">i</span>
            {isTooltipVisible && (
              <div className="fixed items-center top-36 transform -translate-y-full bg-gray-700 text-white text-xs rounded p-2 shadow-lg w-56">
                현재 검사기 모듈에서 실시간 검사 결과를 잘 가져오는지 네트워크 상태를 확인하실 수 있습니다.
              </div>
            )}
          </div>
        </div>

        {/* Step별 검사기 모듈 그룹 표시 */}
        {Object.entries(groupedModules).map(([step, modules]) => (
          <div key={step} className="mb-6">
            <h3 className="font-bold text-blue-600 mb-2">{`Step ${step.replace('step', '')}`}</h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <div
                  key={module.moduleId}
                  className="flex justify-between p-2 border rounded-md bg-gray-100 shadow-sm"
                >
                  <span className="font-medium">{module.moduleId}</span>
                  <span
                    className={`font-semibold ${
                      module.healthy ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {module.healthy ? '🟢' : '🔴'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthModal;
