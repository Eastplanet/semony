'use client'

import { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { WaferData } from '@/app/types';
import { mockData } from './mocks/mock_wafer';

const searchColumns = ['ppid', 'lotId'] as (keyof WaferData)[];
const sortColumns = [
  'date', 'ppid', 'lotId', 'defectCount', 'step1', 'step2', 'step3', 'slotId', 'lotSeq'
] as (keyof WaferData)[];

const searchOptions = searchColumns.map((col) => ({ value: col, label: col.toUpperCase() }));
const sortOptions = sortColumns.map((col) => ({ value: col, label: col.toUpperCase() }));

export default function WaferTable() {
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchColumn, setSearchColumn] = useState<keyof WaferData>('ppid');
  const [sortColumn, setSortColumn] = useState<keyof WaferData>('date');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showTime, setShowTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 기존 상태에 추가
const [visibleColumns, setVisibleColumns] = useState<(keyof WaferData)[]>(sortColumns);


  useEffect(() => {
    setIsClient(true); // 클라이언트 사이드에서만 렌더링
  }, []);

  if (!isClient) return null; // 초기 서버 렌더링 시 아무것도 렌더링하지 않음

  const filteredData = mockData
    .filter((data) => {
      const dataDate = new Date(data.date);
      const isWithinDateRange = startDate && endDate
        ? dataDate >= startDate && dataDate <= endDate
        : true;
      const matchesSearchQuery = `${data[searchColumn]}`.includes(searchQuery);
      return isWithinDateRange && matchesSearchQuery;
    })
    .sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1));

  // 체크박스 클릭 핸들러
    const toggleColumnSelection = (column: keyof WaferData) => {
      setVisibleColumns((prev) =>
        prev.includes(column)
          ? prev.filter((col) => col !== column) // 컬럼이 이미 선택된 경우 제거
          : [...prev, column] // 컬럼이 선택되지 않은 경우 추가
      );
    };


  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'white',
      borderRadius: '9999px',
      padding: '4px 8px',
      borderColor: '#85B6FF',
      boxShadow: '0 0 5px rgba(133, 182, 255, 0.4)',
      cursor: 'pointer',
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? '#E0F2FE' : 'white',
      color: '#333',
      padding: '8px 12px',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1E3A8A',
      fontWeight: '500',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#85B6FF',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <div className="p-8">
      {/* 검색바 */}
      <div className="flex items-center gap-4 mb-8 justify-center py-3 px-4 max-w-lg mx-auto">
        <Select
          value={searchOptions.find((opt) => opt.value === searchColumn)}
          onChange={(selectedOption) => setSearchColumn(selectedOption?.value as keyof WaferData)}
          options={searchOptions}
          className="max-w-32 text-sm w-full"
          styles={customSelectStyles}
        />
        <div className="flex items-center bg-white rounded-full px-4 py-3 w-96 border border-blue-400 shadow-sm hover:shadow-md transition-shadow duration-300">
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-700 w-full text-sm"
          />
          <button className="text-blue-400 hover:text-blue-500 transition-colors ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M21 21l-4.35-4.35M2.75 11.5A8.75 8.75 0 1011.5 2.75 8.75 8.75 0 002.75 11.5z" stroke="#85B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 정렬, 날짜 범위 필터, 컬럼 선택 */}
      <div className="flex items-center gap-4 mb-4 justify-center">
        <Select
          value={sortOptions.find((opt) => opt.value === sortColumn)}
          onChange={(selectedOption) => setSortColumn(selectedOption?.value as keyof WaferData)}
          options={sortOptions}
          className="max-w-xs text-sm"
          styles={customSelectStyles}
        />

        {/* 날짜 범위 필터 */}
        <div className="flex items-center gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showTimeSelect={showTime}
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat={showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
            placeholderText="시작 날짜"
            locale="ko"
            className="px-4 py-2 border rounded text-gray-700 text-sm w-36"
          />
          <span>~</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            showTimeSelect={showTime}
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat={showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
            placeholderText="종료 날짜"
            locale="ko"
            className="px-4 py-2 border rounded text-gray-700 text-sm w-36"
          />
        </div>

        {/* 시간대 포함 옵션 */}
        <label className="flex items-center text-sm text-gray-700 gap-1">
          <input
            type="checkbox"
            checked={showTime}
            onChange={() => setShowTime(!showTime)}
            className="mr-2"
          />
          시간대 포함
        </label>

        {/* 컬럼 선택 모달 열기 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          컬럼 선택
        </button>
      </div>

      {/* 테이블 */}
      <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white uppercase text-sm tracking-wider">
            {visibleColumns.map((col) => (
              <th key={col} className="p-4 text-left font-semibold border-b border-gray-200">
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors`}>
              {visibleColumns.map((col) => (
                <td key={col} className="p-4 text-gray-700 border-b border-gray-200 text-sm">
                  {data[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 컬럼 선택 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 border-b border-gray-300 pb-2">
              컬럼 선택
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {sortColumns.map((col) => (
                // 컬럼 선택 모달 체크박스 연결
              <label key={col} className="flex items-center text-gray-700 text-sm">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col)}
                  onChange={() => toggleColumnSelection(col)}
                  className="mr-2 h-4 w-4 accent-blue-500"
                />
                {col.toUpperCase()}
              </label>

              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                확인
              </button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
