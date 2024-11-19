package com.semony.integrated.infrastructure;

import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO.DefectRecord;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO.SummarySpec;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class WaferInspectionFileReader {

    public static WaferInspectionDTO readFile(String filePath) throws IOException {
        WaferInspectionDTO dto = new WaferInspectionDTO();



        // 외부 경로로부터 파일 읽기
        File file = new File(filePath);
        if (!file.exists()) {
            throw new FileNotFoundException("File not found: " + filePath);
        }


        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)))) {
            String line;
            List<WaferInspectionDTO.DieLocation> dieLocations = new ArrayList<>();
            List<WaferInspectionDTO.DefectRecord> defectRecords = new ArrayList<>();

            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.endsWith(";")) {
                    line = line.substring(0, line.length() - 1).trim();
                }

                if (line.startsWith("FileVersion")) {
                    String[] parts = line.split(" ");
                    dto.setFileVersion(parts[1] + " " + parts[2]);
                } else if (line.startsWith("FileTimestamp")) {
                    dto.setFileTimestamp(line.substring(line.indexOf(" ") + 1));
                } else if (line.startsWith("InspectionStationID")) {
                    dto.setInspectionStationID(
                        parseStringList(line.substring(line.indexOf(" ") + 1)));
                } else if (line.startsWith("SampleType")) {
                    dto.setSampleType(line.split(" ")[1]);
                } else if (line.startsWith("ResultTimestamp")) {
                    dto.setResultTimestamp(line.substring(line.indexOf(" ") + 1));
                } else if (line.startsWith("LotID")) {
                    dto.setLotID(line.split(" ")[1].replace("\"", ""));
                } else if (line.startsWith("SampleSize")) {
                    String[] values = line.substring(line.indexOf(" ") + 1).split(" ");
                    dto.setSampleSize(
                        Arrays.asList(Integer.parseInt(values[0]), Integer.parseInt(values[1])));
                } else if (line.startsWith("SetupID")) {
                    dto.setSetupID(Arrays.asList(line.substring(line.indexOf(" ") + 1).split(" ")));
                } else if (line.startsWith("StepID")) {
                    dto.setStepID(line.split(" ")[1].replace("\"", ""));
                } else if (line.startsWith("CoatorID")) {
                    dto.setCoatorID(Integer.parseInt(line.split(" ")[1]));
                } else if (line.startsWith("SpinName")) {
                    // SpinName is empty or null, handled accordingly if needed
                } else if (line.startsWith("SampleOrientationMarkType")) {
                    dto.setSampleOrientationMarkType(line.split(" ")[1]);
                } else if (line.startsWith("OrientationMarkLocation")) {
                    dto.setOrientationMarkLocation(line.split(" ")[1]);
                } else if (line.startsWith("DiePitch")) {
                    String[] values = line.substring(line.indexOf(" ") + 1).split(" ");
                    dto.setDiePitch(Arrays.asList(Double.parseDouble(values[0]),
                        Double.parseDouble(values[1])));
                } else if (line.startsWith("ShotComposition")) {
                    String[] values = line.substring(line.indexOf(" ") + 1).split(" ");
                    dto.setShotComposition(
                        Arrays.asList(Integer.parseInt(values[0]), Integer.parseInt(values[1])));
                } else if (line.startsWith("DieOrigin")) {
                    String[] values = line.substring(line.indexOf(" ") + 1).split(" ");
                    dto.setDieOrigin(Arrays.asList(Double.parseDouble(values[0]),
                        Double.parseDouble(values[1])));
                } else if (line.startsWith("WaferID")) {
                    dto.setWaferID(line.split(" ")[1].replace("\"", ""));
                } else if (line.startsWith("Slot")) {
                    dto.setSlot(Integer.parseInt(line.split(" ")[1]));
                } else if (line.startsWith("SampleCenterLocation")) {
                    String[] values = line.substring(line.indexOf(" ") + 1).split(" ");
                    dto.setSampleCenterLocation(Arrays.asList(Double.parseDouble(values[0]),
                        Double.parseDouble(values[1])));
                } else if (line.startsWith("InspectionTest")) {
                    dto.setInspectionTest(Integer.parseInt(line.split(" ")[1]));
                } else if (line.startsWith("SampleTestPlan")) {
                    dto.setSampleTestPlan(Integer.parseInt(line.split(" ")[1]));
                } else if (line.matches("-?\\d+ -?\\d+")) {
                    // DieLocation entries
                    String[] values = line.split(" ");
                    WaferInspectionDTO.DieLocation dieLocation = new WaferInspectionDTO.DieLocation();
                    dieLocation.setXIndex(Integer.parseInt(values[0]));
                    dieLocation.setYIndex(Integer.parseInt(values[1]));
                    dieLocations.add(dieLocation);
                } else if (line.startsWith("DefectRecordSpec")) {
                    // Skip this line as it indicates the start of defect records
//                    skipLines(br, 1);
                } else if (line.startsWith("DefectList")) {


                    while ((line = br.readLine()) != null && !line.startsWith("SummarySpec")) {

                        String[] values = line.split(" ");
                        if (values[0].equals("SummarySpec")) {
                            break;
                        }
                        DefectRecord defectRecord = getDefectRecord(values);
                        defectRecords.add(defectRecord);

                    }

                } else if (line.startsWith("SummarySpec")) {
                    // Skip this line as it indicates the start of summary records
                } else if (line.matches("SummaryList")) {
                    // SummarySpec entries
                    line = br.readLine();
                    String[] values = line.split(" ");
                    SummarySpec summarySpec = getSummarySpec(values);
                    dto.setSummarySpec(summarySpec);
                }
            }
            dto.setDieLocations(dieLocations);
            dto.setDefectRecordSpec(defectRecords);
        }
        return dto;
    }

    private static DefectRecord getDefectRecord(String[] values) {
        return DefectRecord.builder()
            .defectID(Integer.parseInt(values[0]))
            .xRel(Double.parseDouble(values[1]))
            .yRel(Double.parseDouble(values[2]))
            .xIndex(Integer.parseInt(values[3]))
            .yIndex(Integer.parseInt(values[4]))
            .xSize(Integer.parseInt(values[5]))
            .ySize(Integer.parseInt(values[6]))
            .defectArea(Integer.parseInt(values[7]))
            .gdsX(Double.parseDouble(values[8]))
            .gdsY(Double.parseDouble(values[9]))
            .grayMin(Double.parseDouble(values[10]))
            .grayMax(Double.parseDouble(values[11]))
            .grayMean(Double.parseDouble(values[12]))
            .alg(Integer.parseInt(values[13]))
            .radius(Double.parseDouble(values[14]))
            .select(Integer.parseInt(values[15]))
            .build();
    }

    private static SummarySpec getSummarySpec(String[] values) {
        return SummarySpec.builder()
            .testNo(Integer.parseInt(values[0]))
            .nDefect(Integer.parseInt(values[1]))
            .defDensity(Double.parseDouble(values[2]))
            .nDie(Integer.parseInt(values[3]))
            .nDefDie(Integer.parseInt(values[4]))
            .build();
    }

    private static List<String> parseStringList(String line) {
        // Remove surrounding quotes and split the string by space
        return Arrays.asList(line.replace("\"", "").split(" "));
    }

    private static void skipLines(BufferedReader br, int numLines) throws IOException {
        for (int i = 0; i < numLines; i++) {
            br.readLine();
        }
    }
}
