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

        SummaryWaferDto waferSummary = getWaferSummary(lotId, lotSeq, flowRecipe, slotNo);


        WaferDetailDTO data = new WaferDetailDTO();
        data.setWaferInspections(new ArrayList<>());

        Set<DiePos>[] sets = new HashSet[4];
        for (int i = 1; i <= 3; i++) {
            sets[i] = new HashSet<>();
        }

        // @Todo : 모듈 별 순서에 맞춰 읽어야 함.
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
            waferInspectionDTO.setModuleId(waferSummary.getModules()[i-1].getModuleId());
            waferInspectionDTO.setEventDtts(waferSummary.getModules()[i-1].getEventDtts());

            data.getWaferInspections().add(waferInspectionDTO);

        }

        List<WaferInspectionSummaryDTO> calcWaferInspectionSummary = getCalcWaferInspectionSummary(sets);
        data.setWaferInspectionSummaryDTO(calcWaferInspectionSummary);

        return data;
    }

    private List<WaferInspectionSummaryDTO> getCalcWaferInspectionSummary(Set<DiePos>[] sets) {
        List<WaferInspectionSummaryDTO> list = new ArrayList<>();

        int dieSize = 1543;

        // 1, 2, 3 선택 시 defectArea 계산
        for (int i = 1; i <= 3; i++) {
            Set<DiePos> set = sets[i];
            WaferInspectionSummaryDTO dto = new WaferInspectionSummaryDTO();
            dto.setDefectArea((double) set.size() / dieSize);
            dto.setChecked(i);
            list.add(dto);
        }

        // 12, 13, 23 선택 시 defectArea 계산
        Set<DiePos> selectedSet = new HashSet<>();
        selectedSet.addAll(sets[1]);
        selectedSet.addAll(sets[2]);
        WaferInspectionSummaryDTO dto = new WaferInspectionSummaryDTO();
        dto.setDefectArea((double) selectedSet.size() / dieSize);
        dto.setChecked(12);
        list.add(dto);

        selectedSet = new HashSet<>();
        selectedSet.addAll(sets[1]);
        selectedSet.addAll(sets[3]);
        dto = new WaferInspectionSummaryDTO();
        dto.setDefectArea((double) selectedSet.size() / dieSize);
        dto.setChecked(13);
        list.add(dto);

        selectedSet = new HashSet<>();
        selectedSet.addAll(sets[2]);
        selectedSet.addAll(sets[3]);
        dto = new WaferInspectionSummaryDTO();
        dto.setDefectArea((double) selectedSet.size() / dieSize);
        dto.setChecked(23);
        list.add(dto);

        // 123 선택 시 defectArea 개선
        selectedSet = new HashSet<>();
        selectedSet.addAll(sets[1]);
        selectedSet.addAll(sets[2]);
        selectedSet.addAll(sets[3]);
        dto = new WaferInspectionSummaryDTO();
        dto.setDefectArea((double) selectedSet.size() / dieSize);
        dto.setChecked(123);
        list.add(dto);
        
        return list;
    }

}
