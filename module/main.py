import random
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
  try:
    # 하위 폴더를 랜덤 선택
    subfolder_options = ["006", "010", "018", "022"]
    selected_subfolder = random.choice(subfolder_options)

    # local_folder_path에 랜덤 하위 폴더 및 매크로 폴더 추가
    # full_local_folder_path = f"{request.localFolderPath}/{request.selectedSubfolder}/{request.macroFolder}"
    # print(request)
    # print(full_local_folder_path)
    # 파일 복사 및 변조 수행
    defectImpo = await process_and_modify_in_module_data(
        request.moduleName,
        request.date,
        request.lotId,
        request.flowRecipe,
        request.lotSeq,
        request.slotNo,
        request.localFolderPath,
        request.macroFolder,
        request.selectedSubfolder
    )
    return {"status": "success", "data": response}
  except Exception as e:
    print(f"Error: {e}")  # 디버깅용 출력
    raise HTTPException(status_code=500, detail=str(e))
