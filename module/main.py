import random
from datetime import datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from service import process_and_modify_in_module_data

app = FastAPI()

# 요청 스키마 정의
class RequestModel(BaseModel):
  moduleName: str
  date: str
  lotId: str
  flowRecipe: str
  lotSeq: str
  slotNo: str
  localFolderPath: str
  macroFolder: str
  selectedSubfolder: str

@app.post("/modules/data")
async def create_and_modify_macro_module_data(request: RequestModel):
  """
  로컬 폴더에서 IN 모듈 데이터를 복사하고 변조한 데이터를 동적으로 생성된 폴더에 저장하는 엔드포인트
  """
  print(request)
  try:
    # request.date를 datetime 객체로 변환
    request_time_dt = datetime.strptime(request.date, "%Y%m%dT%H:%M:%S")

    # 원하는 형식으로 date를 변환
    date = request_time_dt.strftime("%Y%m%d%H")

    # IN 모듈 데이터 처리 및 변조
    defectImpo = await process_and_modify_in_module_data(
        request.moduleName,
        date,
        request.lotId,
        request.flowRecipe,
        request.lotSeq,
        request.slotNo,
        request.localFolderPath,
        request.macroFolder
    )
    print(defectImpo)
    return defectImpo

  except Exception as e:
    print(f"Error: {e}")  # 디버깅용 출력
    raise HTTPException(status_code=500, detail=str(e))
