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