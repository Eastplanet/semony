// TypeScript 데이터 타입 정의
export interface Summary {
    totalDie: string;
    defectDie: string;
    defectArea: string;
    defectCnt: string;
}

export interface DefectInfo {
    moduleId: string;
    timestamp: string;
    defectDie: string;
    defectArea: string;
    defectCnt: string;
}
  
  // 데이터 객체 생성
  const summary: Summary = {
    totalDie: "1543 EA", 
    defectDie: "14 EA",
    defectArea: "0.08%",
    defectCnt: "86 EA",
  };
  
  const defectInfos: DefectInfo[] = [
    {
      moduleId: "MIW7-51",
      timestamp: "2024-10-03 4:11:01 PM",
      defectDie: "3 EA",
      defectArea: "0.002%",
      defectCnt: "24 EA",
    },
    {
      moduleId: "EWIM1-36",
      timestamp: "2024-10-03 4:18:45 PM",
      defectDie: "3 EA",
      defectArea: "0.002%",
      defectCnt: "24 EA",
    },
    {
      moduleId: "MIW7-61",
      timestamp: "2024-10-03 4:45:29 PM",
      defectDie: "3 EA",
      defectArea: "0.002%",
      defectCnt: "24 EA",
    },
  ];
  
  export { summary, defectInfos };
  