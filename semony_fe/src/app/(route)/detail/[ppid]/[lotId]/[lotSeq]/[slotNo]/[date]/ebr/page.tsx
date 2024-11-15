'use client'
import { DataContext } from '../../../../../../DataContext';
import { useContext } from 'react';

// ebrResults 데이터의 인터페이스 정의
interface EbrResultData {
  EbrResultType: number;
  NotchAngle: { Value: number };
  EbrDivideCount: number;
  EbrAverageThickness: { Value: number };
  WaferLoadingCenterOffsetX: { Value: number };
  WaferLoadingCenterOffsetY: { Value: number };
  AfterAlignCenterOffsetX: { Value: number };
  AfterAlignCenterOffsetY: { Value: number };
  ChuckFlatnessAngle: { Value: number };
  m_ebrDividedDataList: {
    $values: {
      Index: number;
      Angle: { Value: number };
      MeasuredEbrWidth: { Value: number };
      BevelWidth: { Value: number };
      FittedEbrWidth: { Value: number };
    }[];
  };
}

const DetailPage: React.FC = () => {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    return null;
  }

  const { mainImages, ebrResults } = dataContext;
  const data = mainImages[1]?.ebr?.data;
  console.log("ebr", ebrResults);

  const imageSrc = `data:image/jpeg;base64,${data}`;

  // 컬럼 이름 정의
  const columnNames: { [key: string]: string } = {
    EbrResultType: 'EBR Result Type',
    NotchAngle: 'Notch Angle [deg]',
    EbrAverageThickness: 'EBR Average Thickness [um]',
    EbrDivideCount: 'EBR Divide Count',
    WaferLoadingCenterOffsetX: 'Wafer Loading Center Offset X [um]',
    WaferLoadingCenterOffsetY: 'Wafer Loading Center Offset Y [um]',
    ChuckFlatnessAngle: 'Chuck Flatness Angle [deg]',
    AfterAlignCenterOffsetX: 'After Align Center Offset X [um]',
    AfterAlignCenterOffsetY: 'After Align Center Offset Y [um]',
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
            {/* ebrResults 데이터 표시 */}
            {ebrResults && (
              <>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['EbrResultType']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.EbrResultType === 0
                      ? 'Processing Fail'
                      : ebrResults.EbrResultType === 1
                      ? 'Result is Abnormal'
                      : ebrResults.EbrResultType === 2
                      ? 'Result is Good'
                      : 'Unknown'}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['NotchAngle']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.NotchAngle.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['EbrAverageThickness']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.EbrAverageThickness.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['EbrDivideCount']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.EbrDivideCount}
                  </td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['WaferLoadingCenterOffsetX']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.WaferLoadingCenterOffsetX.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['WaferLoadingCenterOffsetY']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.WaferLoadingCenterOffsetY.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['AfterAlignCenterOffsetX']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.AfterAlignCenterOffsetX.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['AfterAlignCenterOffsetY']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.AfterAlignCenterOffsetY.Value.toFixed(3)}
                  </td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap text-left border-r border-gray-200">
                    {columnNames['ChuckFlatnessAngle']}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-right font-mono tracking-wide">
                    {ebrResults.ChuckFlatnessAngle.Value.toFixed(3)}
                  </td>
                </tr>
              </>
            )}
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
