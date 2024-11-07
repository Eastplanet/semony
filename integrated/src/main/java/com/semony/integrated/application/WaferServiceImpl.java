package com.semony.integrated.application;

import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.dto.WaferDetailDTO;
import com.semony.integrated.domain.dto.WaferSpecificationValueDto;
import com.semony.integrated.domain.dto.convertor.EqpInspectionHstAlphaConvertor;
import com.semony.integrated.domain.dto.smf.DiePos;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO.DefectRecord;
import com.semony.integrated.domain.dto.smf.WaferInspectionSummaryDTO;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import com.semony.integrated.domain.repository.EqpInspectionHstAlphaRepository;
import com.semony.integrated.infrastructure.WaferInspectionFileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaferServiceImpl implements WaferService {

    private final EqpInspectionHstAlphaRepository repository;

    public SummaryWaferDto getWaferSummary(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo) {

        List<EqpInspectionHstAlpha> list = repository.findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(lotId, lotSeq, flowRecipe, slotNo);
        return EqpInspectionHstAlphaConvertor.convert(list, flowRecipe);
    }

    @Override
    public List<SummaryWaferDto> getWaferSummaryList(LocalDateTime startDate, LocalDateTime endDate) {

        List<WaferSpecificationValueDto> inspectionHistory = repository.findInspectionHistory(startDate, endDate);
        List<SummaryWaferDto> summaryWaferDtoList = new ArrayList<>();

        for (WaferSpecificationValueDto inspection : inspectionHistory) {
            SummaryWaferDto waferSummary = getWaferSummary(inspection.getLotId(), inspection.getLotSeq(), inspection.getFlowRecipe(), inspection.getSlotNo());
            summaryWaferDtoList.add(waferSummary);
        }

        return summaryWaferDtoList;
    }

    @Override
    public WaferDetailDTO getWaferDetail(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo) throws IOException {

        WaferDetailDTO data = new WaferDetailDTO();
        data.setWaferInspections(new ArrayList<>());

        Set<DiePos>[] sets = new HashSet[4];
        for (int i = 1; i <= 3; i++) {
            sets[i] = new HashSet<>();
        }

        WaferInspectionSummaryDTO waferInspectionSummaryDTO = new WaferInspectionSummaryDTO();
//        List<SummaryData> summaryDataList = new ArrayList<>();
        // 여기에 각 모듈 별 서머리 넣는 중이었음

        for (int i = 1; i <= 3; i++) {
            WaferInspectionDTO waferInspectionDTO = WaferInspectionFileReader.readFile(
                "static/module" + i + ".smf");
            data.setDieLocations(waferInspectionDTO.getDieLocations());
            waferInspectionDTO.setDieLocations(null);

            int defectCnt = 0;
            // die cnt 계산
            List<DefectRecord> defectRecordSpec = waferInspectionDTO.getDefectRecordSpec();

            for (DefectRecord defectRecord : defectRecordSpec) {
                DiePos diePos = new DiePos();
                diePos.setXIndex(defectRecord.getXIndex());
                diePos.setYIndex(defectRecord.getYIndex());
                sets[i].add(diePos);
                defectCnt++;
            }

            waferInspectionDTO.setDefectCnt(defectCnt);
            waferInspectionDTO.setDefectDieCnt(sets[i].size());

            data.getWaferInspections().add(waferInspectionDTO);
        }

        return data;
    }
}
