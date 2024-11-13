'use client'
import { DataContext } from '../../../../../../DataContext';
import { useContext } from 'react';

// TypeScript 인터페이스 정의
interface EBRData {
  ebrResult: string;
  notchAngle: number;
  ebrAverageThickness: number;
  ebrDivideCount: number;
  waferLoadingCenterOffsetX: number;
  waferLoadingCenterOffsetY: number;
  chuckFlatnessAngle: number;
  afterAlignCenterOffsetX: number;
  afterAlignCenterOffsetY: number;
}

const DetailPage: React.FC = () => {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    return null;
  }

  const { mainImages } = dataContext;
  const data = mainImages[1]?.ebr?.data;

  // 임시 데이터 생성
  const mockData: EBRData = {
    ebrResult: 'resultisgood',
    notchAngle: 57.105,
    ebrAverageThickness: 720.803,
    ebrDivideCount: 8,
    waferLoadingCenterOffsetX: 20.573,
    waferLoadingCenterOffsetY: 5.735,
    chuckFlatnessAngle: 0.450,
    afterAlignCenterOffsetX: -21.357,
    afterAlignCenterOffsetY: -0.052,
  };

  const imageSrc = `data:image/jpeg;base64,${data}`;

  const columnNames: { [key: string]: string } = {
    ebrResult: 'EBR 결과',
    notchAngle: 'Notch Angle [deg]',
    ebrAverageThickness: 'EBR 평균 두께 [um]',
    ebrDivideCount: 'EBR Divide Count',
    waferLoadingCenterOffsetX: 'Wafer Loading Center OffsetX [um]',
    waferLoadingCenterOffsetY: 'Wafer Loading Center OffsetY [um]',
    chuckFlatnessAngle: 'Chuck Flatness Angle [deg]',
    afterAlignCenterOffsetX: 'After Align Center OffsetX [um]',
    afterAlignCenterOffsetY: 'After Align Center OffsetY [um]',
  };
  return (
    <div className="flex flex-col justify-center md:flex-row w-full h-[80vh] gap-8 p-6">
      {/* 테이블 */}
      <div className="md:w-fit p-4 bg-white rounded-xl shadow-lg border-2">
        <h2 className="text-lg font-bold text-gray-800 p-4 mb-4">
          <span className="text-blue-600">📊</span> EBR 정보
        </h2>
        <table className="min-w-full text-xs table-fixed">
          <tbody>
            {Object.entries(mockData).map(([key, value], index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} transition-colors duration-200 hover:bg-blue-100`}
              >
                <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    {columnNames[key]}
                  
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                  {typeof value === 'number' ? value.toFixed(3) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 이미지 */}
      <div className="w-fit bg-white rounded-lg shadow-md">
        {data ? (
          <img
            src={imageSrc}
            alt="ebr"
            className="rounded-lg shadow-lg max-w-full h-full h-auto object-contain"
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-gray-500">Loading image...</p>
          </div>
        )}
      </div>

      {/* 로딩 스피너 스타일 */}
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DetailPage;
