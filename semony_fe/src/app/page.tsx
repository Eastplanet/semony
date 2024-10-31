'use client'

import React, { useState, useEffect, useRef,useLayoutEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { mockData } from './mocks/mock_wafer';

const WaferTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [filters, setFilters] = useState<{ [key: string]: Set<string> }>({});
  const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>({});
  const [isFilterOpen, setIsFilterOpen] = useState<{ [key: string]: boolean }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [filteredValues, setFilteredValues] = useState<{ [key: string]: string[] }>({});
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    ppid: 150,
    lotId: 150,
    lotSeq: 150,
    slotId: 150,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const columns = ['ppid', 'lotId', 'lotSeq', 'slotId'];
  const minColumnWidths = useRef<{ [key: string]: number }>({});

  useLayoutEffect(() => {
    columns.forEach((col) => {
      const contentWidth = document.getElementById(`header-${col}`)?.offsetWidth || 150;
      minColumnWidths.current[col] = contentWidth;
    });
  }, []);


  useEffect(() => {
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
  const handleResize = (column: string, newWidth: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [column]: Math.max(newWidth, minColumnWidths.current[column] || 100),
    }));
  };

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
          <tr className="bg-blue-600 text-white uppercase text-sm tracking-wider">
            {columns.map((col) => (
              <th
                key={col}
                className="font-semibold border-b border-gray-200 relative"
                id={`header-${col}`}
                
              >
               <ResizableBox
                  width={columnWidths[col]}
                  height={40}
                  axis="x"
                  resizeHandles={['e']}
                  minConstraints={[minColumnWidths.current[col] || 100, 40]}
                  maxConstraints={[500, 40]}
                  onResize={(e, { size }) => handleResize(col, size.width)}
                  className="flex items-center justify-center resizable-header"
                >
                  <div
                    className="flex items-center justify-center gap-1 cursor-pointer"
                    style={{ width: columnWidths[col], position: 'relative' }}
                    onClick={() => handleSort(col)}
                  >
                    {col.toUpperCase()}
                    {sortColumn === col && (
                      <span>{sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}</span>
                    )}
                  </div>
                </ResizableBox>
                {/* 필터 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFilter(col, e);
                  }}
                  className="ml-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  ▼
                </button>

                {/* 필터 드롭다운 */}
                {isFilterOpen[col] && dropdownPosition && (
                  <div
                    ref={dropdownRef}
                    className="fixed text-gray-500 font-normal text-xs bg-white border border-gray-300 p-2 rounded shadow-lg z-50 w-48"
                    style={{ top: dropdownPosition.top + 30, left: dropdownPosition.left }}
                  >
                    <button
                      className="absolute p-2 top-1 right-1 text-xs text-gray-400 hover:text-gray-600"
                      onClick={(e) => toggleFilter(col, e)}
                    >
                      ✕
                    </button>
                    <input
                      type="text"
                      placeholder="Search..."
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
                      onClick={applyFilter}
                      className="mt-2 bg-blue-500 text-white text-xs py-1 px-2 rounded"
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
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors`}
              >
                {moduleIndex === 0 && (
                  <>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" style={{ width: columnWidths['ppid'] }}>{data.ppid}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" style={{ width: columnWidths['lotId'] }}>{data.lotId}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" style={{ width: columnWidths['lotSeq'] }}>{data.lotSeq}</td>
                    <td rowSpan={data.modules.length} className="p-4 text-gray-700 border-b border-gray-200 text-sm" style={{ width: columnWidths['slotId'] }}>{data.slotId}</td>
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
