'use client'

import React, { useState, useEffect, useRef } from 'react';
import 'react-resizable/css/styles.css';
import { mockData } from './mocks/mock_wafer';
import Image from 'next/image';
import request from './apis/request';

const WaferTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [filters, setFilters] = useState<{ [key: string]: Set<string> }>({});
  const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>({});
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [filteredValues, setFilteredValues] = useState<{ [key: string]: string[] }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const columns = ['ppid', 'lotId', 'lotSeq', 'slotId'];


  useEffect(() => {
    const now = new Date();

    // 로컬 시간대의 날짜 및 시간 형식을 "yyyy-MM-ddThh:mm:ss"로 맞추기
    const formatDateTime = (date: Date): string => {
      const pad = (num: number): string => num.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    

    const startDate = formatDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate())); // 오늘 시작 시간
    const endDate = formatDateTime(now); // 현재 시간

    // URL에 startDate와 endDate를 포함하여 요청을 보냅니다
    request(`wafer?startDate=${startDate}&endDate=${endDate}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));

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
    setDropdownPosition({ top: rect.top + window.scrollY, left: rect.left });

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
    return Array.from(new Set(mockData.map((data) => data[column as keyof typeof data]?.toString() || '')));
  };

  // 필터 적용 버튼 클릭 시 필터를 적용
  const applyFilter = () => {
    setIsFilterOpen({});
  };

  // 데이터 필터링 및 정렬
  const filteredData = mockData
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
    <div className="p-8 text-center relative">
      <table className="mt-10 min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
        <thead>
          <tr className="bg-blue-600 text-white uppercase text-sm ">
            {columns.map((col) => (
              <th
                key={col}
                className="font-semibold border-b  border-gray-200 relative"
                id={`header-${col}`}
                style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgb(37, 99, 235)' }}
              >
               
                  <div
                    className="flex items-center justify-center gap-1 cursor-pointer"
                    onClick={() => handleSort(col)}
                  >
                    <Image src="/icons/arrowUp.png" alt="정렬" width={10} height={10} />
                    {sortColumn === col && (
                      sortOrder === 'asc' ? (<span>▲</span>) : sortOrder === 'desc' ? (<span>▼</span>): 
                      ''
                    )}
                    {col.toUpperCase()}
                    
                    <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFilter(col, e);
                  }}
                  className="ml-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  <Image src="/icons/filter.png" alt="Zoom In" width={16} height={16} />
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
            <th className="p-4 font-semibold border-b border-gray-200 border-r-2" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgb(37, 99, 235)' }}>
              TOTAL DEFECT
            </th>
            <th className="p-4 font-semibold border-b border-gray-200" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgb(37, 99, 235)' }}>
              MODULE ID
            </th>
            <th className="p-4 font-semibold border-b border-gray-200" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgb(37, 99, 235)' }}>
              DEFECT
            </th>
            <th className="p-4 font-semibold border-b border-gray-200" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgb(37, 99, 235)' }}>
              EVENT DTTS
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            data.modules.map((module, moduleIndex) => (
              <tr
                key={`${index}-${moduleIndex}`}
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} transition-colors`}
              >
                {moduleIndex === 0 && (
                  <>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" >{data.ppid}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" >{data.lotId}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" >{data.lotSeq}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" >{data.slotId}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 text-sm border-r-[1px] border-gray-400">{data.defectCount}</td>
                  </>
                )}
                <td className="px-4 py-1 text-gray-700 text-xs">{module.module_id}</td>
                <td className="px-4 py-1 text-gray-700 text-xs">{module.defect}</td>
                <td className="px-4 py-1 text-gray-700 text-xs">{module.event_dtts}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaferTable;
