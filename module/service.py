import os
import shutil
from constants import ROOT_PATH


def generate_file_name(flow_recipe, lot, slot_no, case="default"):
  """
  매개변수에 따라 파일 이름을 동적으로 생성.
  case 매개변수로 파일 생성 방식을 지정합니다.
  """
  if case == "thumbnail":
    file_name = f"PPID[{flow_recipe}]_LOT[{lot}]_WAFER[{slot_no}]_Thumbnail_Macro[Inspection]"
  elif case == "smf":
    file_name = f"PPID[{flow_recipe}]_LOT[{lot}]_WAFER[{slot_no}]"
  else:
    file_name = f"DefaultFile_{flow_recipe}_{lot}_{slot_no}"

  print(f"Generated file name ({case}): {file_name}")
  return file_name


def process_files_from_local(local_folder_path, target_folder_path, flow_recipe,
    lot, date, slot_no):
  """
  로컬 폴더에서 파일 및 폴더를 지정된 경로로 복사하고 필요에 따라 변조
  """
  if not os.path.exists(local_folder_path):
    raise FileNotFoundError(
        f"Local folder path '{local_folder_path}' does not exist.")

  for root, dirs, files in os.walk(local_folder_path):
    relative_path = os.path.relpath(root, local_folder_path)
    target_root = os.path.join(target_folder_path, relative_path)
    os.makedirs(target_root, exist_ok=True)

    for file_name in files:
      original_file_path = os.path.join(root, file_name)
      # print(f"Original file path: {original_file_path}")  # 디버깅용 출력

      if not os.path.isfile(original_file_path):
        # print(f"Skipping '{original_file_path}': Not a file.")
        continue  # 파일이 아닌 경우 건너뜁니다.

      try:
        if "tempSmf" in file_name:
          # .smf 파일 처리 - 이름과 내부 데이터 변경, 확장자는 .smf로 설정
          smf_file_name = generate_file_name(flow_recipe, lot, slot_no,
                                             case="smf") + ".smf"
          modified_data = modify_file_data(original_file_path, date, lot,
                                           flow_recipe, slot_no)
          modified_file_path = os.path.join(target_root, smf_file_name)

          with open(modified_file_path, "wb") as modified_file:
            modified_file.write(modified_data)

        elif "tempThumbnail" in file_name:
          # .BMP 파일로 이름만 변경하여 복사
          thumbnail_file_name = generate_file_name(flow_recipe, lot, slot_no,
                                                   case="thumbnail") + ".BMP"
          target_file_path = os.path.join(target_root, thumbnail_file_name)

          shutil.copy(original_file_path, target_file_path)

        else:
          # 나머지 파일은 원본 이름으로 변경 없이 복사
          target_file_path = os.path.join(target_root, file_name)
          print(
              f"Copying '{original_file_path}' to '{target_file_path}' (no changes)")  # 디버깅용 출력
          shutil.copy(original_file_path, target_file_path)

      except Exception as e:
        print(f"Error processing file '{file_name}': {e}")


def create_target_folder_path(module_name, date, lotId, flow_recipe, lotSeq,
    slotNo, macro_folder):
  """
  동적으로 폴더 경로를 생성하고 반환
  """
  # folder_id를 요구된 형식으로 생성
  folder_id = f"LP2{date}_PJ2@{lotId}[{flow_recipe}]-{lotSeq}"

  # 최종 폴더 경로를 구성, 마지막에 macro_folder 추가
  target_folder_path = os.path.join(
      ROOT_PATH, module_name, "InVision", "SaveData", date, folder_id, slotNo,
      macro_folder
  )
  os.makedirs(target_folder_path, exist_ok=True)
  return target_folder_path


async def process_and_modify_in_module_data(
    module_name: str, date: str, lotId: str, flow_recipe: str, lotSeq: str,
    slotNo: str, local_folder_path: str, macro_folder: str,
    selectedSubfolder: str
):
  """
  매개변수에 따라 파일을 로컬에서 복사하고 이름과 데이터를 변경하는 메인 함수
  """
  # lot_id를 생성
  lot_id = f"LP2{date}_PJ2@{lotId}"
  print(macro_folder)
  # 대상 폴더 경로 생성
  target_folder_path = create_target_folder_path(
      module_name, date, lotId, flow_recipe, lotSeq, slotNo, macro_folder
  )

  # 복사 및 변조 작업 실행
  process_files_from_local(local_folder_path, target_folder_path, flow_recipe,
                           lot_id, date, slotNo)

  return {"folder": target_folder_path, "local_folder": local_folder_path}


def modify_file_data(file_path, date, lot_id, flow_recipe, slot_no):
  """
  .smf 파일 내부 데이터를 변조하여 반환
  """
  modified_lines = []
  with open(file_path, 'r') as f:
    lines = f.readlines()

  # 각 줄을 검사하고 필요한 경우 변경
  for line in lines:
    if line.startswith("FileTimestamp"):
      # FileTimestamp 줄을 삭제하고 새 줄 추가
      modified_lines.append(f"FileTimestamp {date} 16:13:37;\n")
    elif line.startswith("LotID"):
      # LotID 줄을 삭제하고 새 줄 추가
      modified_lines.append(f'LotID "{lot_id}"\n')
    elif line.startswith('SetupID ""'):
      # SetupID 줄을 삭제하고 새 줄 추가
      modified_lines.append(f'SetupID "" {date} 16:13:37;\n')
    elif line.startswith("StepID"):
      # StepID 줄을 삭제하고 새 줄 추가
      modified_lines.append(f'StepID "{flow_recipe}"\n')
    elif line.startswith('WaferID'):
      # WaferID 줄을 삭제하고 새 줄 추가
      modified_lines.append(f'WaferID "{slot_no}";\n')
    elif line.startswith("Slot"):
      # Slot 줄을 삭제하고 새 줄 추가
      modified_lines.append(f"Slot {slot_no};\n")
    else:
      # 변경하지 않는 줄은 그대로 추가
      modified_lines.append(line)

  # print(f"Modified text in SMF file: {file_path}")  # 디버깅용 출력
  return "".join(modified_lines).encode('utf-8')
