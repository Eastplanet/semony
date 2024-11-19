package com.semony.integrated.infrastructure;

import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class WaferInspectionFileReaderTest {

    private File testFile;

    @BeforeEach
    void setUp() throws IOException {
        // 임시 파일 생성
        testFile = File.createTempFile("wafer_inspection_test", ".txt");
        try (FileWriter writer = new FileWriter(testFile)) {
            writer.write("FileVersion 1 7;\n");
            writer.write("FileTimestamp 03-10-2024 16:14:29;\n");
            writer.write("InspectionStationID \"SAMSUNG\" \"Defect-IM\" \"SPINNER\";\n");
            writer.write("SampleType WAFER;\n");
            writer.write("ResultTimestamp 03-10-2024 16:14:29;\n");
            writer.write("LotID \"LP22024100315_PJ2@89654577\"\n");
            writer.write("SampleSize 1 300;\n");
            writer.write("SetupID \"\" \"03-10-2024 16:14:29\";\n");
            writer.write("StepID \"0TT_EWIM_NO_CHHP\"\n");
            writer.write("CoatorID 619;\n");
            writer.write("SpinName;\n");
            writer.write("SampleOrientationMarkType NOTCH\n");
            writer.write("OrientationMarkLocation DOWN;\n");
            writer.write("DiePitch 8639.48 4986.74\n");
            writer.write("ShotComposition 3 6\n");
            writer.write("DieOrigin -12929.14 1015.01;\n");
            writer.write("WaferID \"24\";\n");
            writer.write("Slot 24;\n");
            writer.write("SampleCenterLocation -12929.14 1015.01;\n");
            writer.write("InspectionTest 1;\n");
            writer.write("SampleTestPlan 1543\n");
            writer.write("-18 -9\n");
            writer.write("-18 -8\n");
            writer.write("DefectRecordSpec 1 DEFECTID XREL YREL XINDEX YINDEX XSIZE YSIZE\nDEFECTAREA GDSX GDSY GRAY_MIN GRAY_MAX GRAY_MEAN ALG RADIUS\nSELECT;\n");
            writer.write("DefectList;\n");
            writer.write("1 4808.6 2229.1 5 -1 12 8 67 5119.9 3899.5 15.0 51.0 32.4 1 61051.8 1\n");
            writer.write("SummarySpec 5 TESTNO NDEFECT DEFDENSITY NDIE NDEFDIE;\n");
            writer.write("SummaryList\n");
            writer.write("0 2 0.000 1543 2\n");
            writer.write("EndOfFile;\n");
        }
    }

    @AfterEach
    void tearDown() {
        if (testFile.exists()) {
            testFile.delete();
        }
    }

    @Test
    void testReadFile() throws IOException {
        WaferInspectionDTO dto = WaferInspectionFileReader.readFile(testFile.getAbsolutePath());

        assertNotNull(dto);
        assertEquals("1 7", dto.getFileVersion());
        assertEquals("03-10-2024 16:14:29", dto.getFileTimestamp());
        assertEquals("WAFER", dto.getSampleType());
        assertEquals("LP22024100315_PJ2@89654577", dto.getLotID());
        assertEquals(1, dto.getSampleSize().get(0));
        assertEquals(300, dto.getSampleSize().get(1));
        assertEquals("0TT_EWIM_NO_CHHP", dto.getStepID());
        assertEquals(619, dto.getCoatorID());
        assertEquals("NOTCH", dto.getSampleOrientationMarkType());
        assertEquals("DOWN", dto.getOrientationMarkLocation());
        assertEquals(2, dto.getDieLocations().size());
        assertEquals(-18, dto.getDieLocations().get(0).getXIndex());
        assertEquals(-9, dto.getDieLocations().get(0).getYIndex());
        assertEquals(1, dto.getDefectRecordSpec().size());
        assertEquals(1, dto.getDefectRecordSpec().get(0).getDefectID());
        assertEquals(1543, dto.getSummarySpec().getNDie());
        assertEquals(2, dto.getSummarySpec().getNDefDie());
    }
}
