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



def process_files_from_local(local_folder_path, target_folder_path, flow_recipe, lot, date, slot_no):
  """
  로컬 폴더에서 파일 및 폴더를 지정된 경로로 복사하고 필요에 따라 변조
  """
  if not os.path.exists(local_folder_path):
    raise FileNotFoundError(f"Local folder path '{local_folder_path}' does not exist.")

  for root, dirs, files in os.walk(local_folder_path):
    relative_path = os.path.relpath(root, local_folder_path)
    target_root = os.path.join(target_folder_path, relative_path)
    os.makedirs(target_root, exist_ok=True)

    for file_name in files:
      original_file_path = os.path.join(root, file_name)
      #print(f"Original file path: {original_file_path}")  # 디버깅용 출력

      if not os.path.isfile(original_file_path):
        #print(f"Skipping '{original_file_path}': Not a file.")
        continue  # 파일이 아닌 경우 건너뜁니다.

      try:
        if "tempSmf" in file_name:
          # .smf 파일 처리 - 이름과 내부 데이터 변경, 확장자는 .smf로 설정
          smf_file_name = generate_file_name(flow_recipe, lot, slot_no, case="smf") + ".smf"
          modified_data = modify_file_data(original_file_path, date, lot, flow_recipe, slot_no)
          modified_file_path = os.path.join(target_root, smf_file_name)

          with open(modified_file_path, "wb") as modified_file:
            modified_file.write(modified_data)

        elif "tempThumbnail" in file_name:
          # .BMP 파일로 이름만 변경하여 복사
          thumbnail_file_name = generate_file_name(flow_recipe, lot, slot_no, case="thumbnail") + ".BMP"
          target_file_path = os.path.join(target_root, thumbnail_file_name)

          shutil.copy(original_file_path, target_file_path)

        else:
          # 나머지 파일은 원본 이름으로 변경 없이 복사
          target_file_path = os.path.join(target_root, file_name)
          print(f"Copying '{original_file_path}' to '{target_file_path}' (no changes)")  # 디버깅용 출력
          shutil.copy(original_file_path, target_file_path)

      except Exception as e:
        print(f"Error processing file '{file_name}': {e}")
