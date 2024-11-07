import os
import shutil
import json
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
  defect_data = None
  #print("local" + local_folder_path)
  if not os.path.exists(local_folder_path):
    raise FileNotFoundError(
        f"Local folder path '{local_folder_path}' does not exist.")

  for root, dirs, files in os.walk(local_folder_path):
    relative_path = os.path.relpath(root, local_folder_path)
    target_root = os.path.join(target_folder_path, relative_path)
    os.makedirs(target_root, exist_ok=True)

    for file_name in files:
      original_file_path = os.path.join(root, file_name)
      print(f"Original file path: {original_file_path}")  # 디버깅용 출력

      if not os.path.isfile(original_file_path):
        continue  # 파일이 아닌 경우 건너뜁니다.

      try:
        if "Result" in file_name:
          # result.json 파일일 경우 데이터 읽어오기 함수 실행 및 JSON 리턴
          defect_data = get_defect_data(original_file_path)

        if "tempSmf" in file_name:
          smf_file_name = generate_file_name(flow_recipe, lot, slot_no,
                                             case="smf") + ".smf"
          modified_data = modify_file_data(original_file_path, date, lot,
                                           flow_recipe, slot_no)
          modified_file_path = os.path.join(target_root, smf_file_name)
          with open(modified_file_path, "wb") as modified_file:
            modified_file.write(modified_data)

        elif "tempThumbnail" in file_name:
          thumbnail_file_name = generate_file_name(flow_recipe, lot, slot_no,
                                                   case="thumbnail") + ".BMP"
          target_file_path = os.path.join(target_root, thumbnail_file_name)
          shutil.copy(original_file_path, target_file_path)

        else:
          target_file_path = os.path.join(target_root, file_name)
          # print(f"Copying '{original_file_path}' to '{target_file_path}' (no changes)")
          shutil.copy(original_file_path, target_file_path)


      except Exception as e:
        print(f"Error processing file '{file_name}': {e}")

  # print("ppaa" + str(defect_data))
  return defect_data


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
  full_local_folder_path = f"{local_folder_path}/{selectedSubfolder}/{macro_folder}"
  # print(macro_folder)
  target_folder_path = None
  # 기본 대상 폴더 경로 생성
  target_folder_path = create_target_folder_path(
      module_name, date, lotId, flow_recipe, lotSeq, slotNo, macro_folder
  )
  # print("asasapp"+macro_folder)
  # macro_folder가 "EBR"인 경우
  if macro_folder == "EBR":
    # 첫 번째 process_files_from_local 실행
    defect_data = process_files_from_local(full_local_folder_path,
                                           target_folder_path,
                                           flow_recipe, lot_id, date, slotNo)

    # target_folder_path를 "Macro[Inspection]"으로 다시 설정
    # print("sasa"+str(defect_data))
    target_folder_path = create_target_folder_path(
        module_name, date, lotId, flow_recipe, lotSeq, slotNo,
        "Macro[Inspection]"
    )
    # print("target: " + target_folder_path)
  # print("target: " + target_folder_path)
  full_local_folder_path = f"{local_folder_path}/{selectedSubfolder}/{"Macro[Inspection]"}"
  defect_data = process_files_from_local(full_local_folder_path,
                                         target_folder_path,
                                         flow_recipe, lot_id, date, slotNo)

  return defect_data
  # print(f"defect_data: {defect_data}")


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
