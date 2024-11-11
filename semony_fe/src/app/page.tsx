'use client'

import React, { useState, useEffect, useRef } from 'react';
import 'react-resizable/css/styles.css';
import Image from 'next/image';
import request from './apis/request';
import {WaferData} from '@/app/types';
import { mockData } from './mocks/mock_wafer';
import { useRouter } from 'next/navigation';

const WaferTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [filters, setFilters] = useState<{ [key: string]: Set<string> }>({});
  const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>({});
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [filteredValues, setFilteredValues] = useState<{ [key: string]: string[] }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState<WaferData[]>([]);
  const [startDate, setStartDate] = useState('2024-10-03T00:00:00');
  const [endDate, setEndDate] = useState('2024-10-03T19:00:00');
  const router = useRouter();
  const columns = ['ppid', 'lotId', 'lotSeq', 'slotNo'];

  const fetchData = () => {
      request(`wafer?startDate=${startDate}&endDate=${endDate}`)
        .then((data) => {
          setListData(data);
        })
        .catch((err) => {console.error(err);
          setListData(mockData);
        });
    };
    
  useEffect(() => {
    const now = new Date();

    // 로컬 시간대의 날짜 및 시간 형식을 "yyyy-MM-ddThh:mm:ss"로 맞추기
    const formatDateTime = (date: Date): string => {
      const pad = (num: number): string => num.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    

    const startDate = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate())); // 오늘 시작 시간
    const endDate = formatDateTime(now); // 현재 시간
    setStartDate(startDate);
    setEndDate(endDate);
    // URL에 startDate와 endDate를 포함하여 요청을 보냅니다
    request(`wafer?startDate=${startDate}&endDate=${endDate}`)
      .then((data) => {
        console.log(data);
        setListData(data);
      })
      .catch((err) => console.error(err));
    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  // 필터 열기/닫기 토글, 드롭다운 위치 설정
  const toggleFilter = (column: string, event: React.MouseEvent) => {
    setIsFilterOpen({ [column]: !isFilterOpen[column] });

    // 드롭다운을 화면 최상단에 고정시키기 위한 위치 설정
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDropdownPosition({ top: rect.top, left: rect.left });

    // 검색어 초기화 및 필터링된 값 리스트 초기화
    setSearchTerm({ [column]: '' });
    setFilteredValues({ [column]: uniqueValues(column) });
  };

  // 선택된 필터 값 변경
  const handleFilterChange = (column: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const newSet = new Set(prev[column] || []);
      if (checked) newSet.add(value);
      else newSet.delete(value);
      return { ...prev, [column]: newSet };
    });
  };

  // 검색어 변경
  const handleSearchTermChange = (column: string, term: string) => {
    setSearchTerm((prev) => ({ ...prev, [column]: term }));
    setFilteredValues({
      [column]: uniqueValues(column).filter((value) =>
        value.toLowerCase().includes(term.toLowerCase())
      ),
    });
  };

  // '모두 선택' 토글
  const toggleSelectAll = (column: string, values: string[], selectAll: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [column]: new Set(selectAll ? values : []),
    }));
  };

  // 정렬 토글 함수
  const handleSort = (column: string) => {
    const nextOrder = sortColumn === column
      ? (sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'none' : 'asc')
      : 'asc';
    setSortColumn(nextOrder === 'none' ? null : column);
    setSortOrder(nextOrder);
  };

  // 각 열의 고유한 값 가져오기
  const uniqueValues = (column: string) => {
    return Array.from(new Set(listData.map((data) => data[column as keyof typeof data]?.toString() || '')));
  };

  // 필터 적용 버튼 클릭 시 필터를 적용
  const applyFilter = () => {
    setIsFilterOpen({});
  };

  // 데이터 필터링 및 정렬
  const filteredData = listData
    .filter((data) => {
      return columns.every((col) => {
        const value = data[col as keyof typeof data]?.toString() || '';
        const searchTermMatches = searchTerm[col] ? value.includes(searchTerm[col]) : true;
        const filterMatches = filters[col] ? filters[col].has(value) : true;
        return searchTermMatches && filterMatches;
      });
    })
    .sort((a, b) => {
      if (!sortColumn || sortOrder === 'none') return 0;
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof a];
      return (aValue > bValue ? 1 : -1) * (sortOrder === 'asc' ? 1 : -1);
    });

 

  return (
    <div className="p-4 text-center relative  ">
      <div className="flex justify-end items-center mb-4">
        <div className='mr-12'>
          <label className="mr-2">시작 시간:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="mr-2">끝 시간:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={fetchData} // 검색 버튼 클릭 시 fetchData 호출
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          검색
  </button>
      </div>

      <div className="overflow-y-auto h-[85vh]  rounded-2xl"> {/* 높이 제한과 오버플로우 설정 */}
      <table className="min-w-full table-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <thead className="bg-blue-700 text-white text-xs" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
  <tr>
    {/* 병합된 열 설정 - rowSpan으로 두 행을 병합 */}
    {columns.map((col) => (
      <th
        key={col}
        rowSpan={2} // 두 행을 병합
        className="p-4 font-semibold border-b border-gray-300 relative min-w-[100px]" // 최소 너비 설정
        id={`header-${col}`}
      >
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="flex items-center justify-center gap-1">
            <button
              className="px-2 py-[1px] rounded-lg bg-opacity-60 bg-white text-gray-700 text-[10px] font-normal hover:bg-blue-300 transition-colors"
              onClick={() => handleSort(col)}
            >
              정렬
            </button>
           
          </div>
          <div className='flex'>
          <span className="text-center whitespace-pre-wrap pr-1">{col === 'slotNo' ? 'SLOT' : col.toUpperCase()}</span> 
          {sortColumn === col && (sortOrder === 'asc' ? <span>▲</span> : <span>▼</span>)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFilter(col, e);
            }}
            className="text-xs text-gray-300 hover:text-gray-200"
            style={{ minWidth: '20px' }} // 아이콘의 최소 너비 유지
          >
            <Image src="/icons/filter.png" alt="Filter" width={16} height={16} />
          </button>
        </div>
        {/* 필터 드롭다운 */}
        {isFilterOpen[col] && dropdownPosition && (
          <div
            ref={dropdownRef}
            className="fixed text-gray-500 font-normal text-xs bg-white border border-gray-300 p-2 rounded shadow-lg z-50 w-48"
            style={{ top: dropdownPosition.top + 30, left: dropdownPosition.left }}
          >
            <input
              type="text"
              placeholder="검색"
              value={searchTerm[col] || ''}
              onChange={(e) => handleSearchTermChange(col, e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
            />
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters[col]?.size === uniqueValues(col).length}
                onChange={(e) => toggleSelectAll(col, filteredValues[col], e.target.checked)}
              />
              <label className="">(모두 선택)</label>
            </div>
            <div className="max-h-32 overflow-y-auto">
              {filteredValues[col]?.map((value) => (
                <div key={value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters[col]?.has(value) || false}
                    onChange={(e) => handleFilterChange(col, value, e.target.checked)}
                  />
                  <label className="">{value}</label>
                </div>
              ))}
            </div>
            <button
              className=" bg-gray-500 text-white text-xs py-1 px-2 rounded m-2"
              onClick={(e) => toggleFilter(col, e)}
            >
              닫기
            </button>
            <button
              onClick={applyFilter}
              className=" bg-blue-500 text-white text-xs py-1 px-2 rounded m-2"
            >
              적용
            </button>
          </div>
        )}
      </th>
    ))}
    <th rowSpan={2} className="p-4 font-semibold border-b border-gray-300 text-gray-100">
      TOTAL DEFECT
    </th>
    {/* STEP 헤더 그룹 */}
    {Array.from({ length: 3 }).map((_, stepIndex) => (
      <th key={`step-header-${stepIndex}`} colSpan={3} className="p-4 font-semibold border-b border-gray-300 text-center">
        STEP {stepIndex + 1}
      </th>
    ))}
  </tr>
  <tr className="bg-blue-600 text-white uppercase text-xs">
    {/* STEP 하위 ID, DEFECT, TIME 헤더 */}
    {Array.from({ length: 3 }).map((_, stepIndex) => (
      <React.Fragment key={`module-header-${stepIndex}`}>
        <th className="p-4 font-semibold border-b border-gray-300 border-l">ID</th>
        <th className="p-4 font-semibold border-b border-gray-300">DEFECT</th>
        <th className="p-4 font-semibold border-b border-gray-300 border-r">TIME</th>
      </React.Fragment>
    ))}
  </tr>
</thead>




{/* 본문 데이터 */}
<tbody className="text-sm text-gray-700">
  {filteredData.map((data, index) => (
    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} transition-colors`}
    onClick={() => {router.push(`/detail/${data.ppid}/${data.lotId}/${data.lotSeq}/${data.slotNo}/waferMap`)}}>
      <td rowSpan={1} className="p-4 text-gray-700 border-b border-gray-300 text-xs">
        {data.ppid}
      </td>
      <td rowSpan={1} className="p-4 text-gray-700 border-b border-gray-300 text-xs">
        {data.lotId}
      </td>
      <td rowSpan={1} className="p-4 text-gray-700 border-b border-gray-300 text-xs">
        {data.lotSeq}
      </td>
      <td rowSpan={1} className="p-4 text-gray-700 border-b border-gray-300 text-xs">
        {data.slotNo}
      </td>
      <td rowSpan={1} className="p-4 text-gray-700 border-b border-gray-300 text-sm border-r-[1px]">
        {data.totalDefectCount}
      </td>

      {/* 각 STEP의 모듈 정보를 일렬로 나열 */}
      {data.modules.map((module, moduleIndex) => (
        <React.Fragment key={`module-${moduleIndex}`}>
          <td className="px-4 py-1 text-gray-700 text-xs border-l border-b border-gray-300">
            {module ? module.moduleId : '-'}
          </td>
          <td className="px-4 py-1 text-gray-700 border-b text-xs border-gray-300">
            {module ? module.defect : '-'}
          </td>
          <td className="px-4 py-1 text-gray-700 text-xs border-r border-b border-gray-300">
            {module ? module.eventDtts : '-'}
          </td>
        </React.Fragment>
      ))}
    </tr>
  ))}
</tbody>


      </table>
      </div>
    </div>
  );
};

export default WaferTable;
