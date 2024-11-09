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
import com.semony.integrated.domain.entity.FlowRecipe;
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

    public SummaryWaferDto getWaferSummary(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo) {

        List<EqpInspectionHstAlpha> list = repository.findByLotIdAndLotSeqAndFlowRecipeAndSlotNo(
            lotId, lotSeq, flowRecipe, slotNo);
        return EqpInspectionHstAlphaConvertor.convert(list, flowRecipe);
    }

    @Override
    public List<SummaryWaferDto> getWaferSummaryList(LocalDateTime startDate,
        LocalDateTime endDate) {

        List<WaferSpecificationValueDto> inspectionHistory = repository.findInspectionHistory(
            startDate, endDate);

        List<SummaryWaferDto> summaryWaferDtoList = new ArrayList<>();

        for (WaferSpecificationValueDto inspection : inspectionHistory) {
            SummaryWaferDto waferSummary = getWaferSummary(inspection.getLotId(),
                inspection.getLotSeq(), inspection.getFlowRecipe(), inspection.getSlotNo());
            summaryWaferDtoList.add(waferSummary);
        }

        return summaryWaferDtoList;
    }

    @Override
    public WaferDetailDTO getWaferDetail(String lotId, BigDecimal lotSeq, String flowRecipe,
        String slotNo) throws IOException {

        SummaryWaferDto waferSummary = getWaferSummary(lotId, lotSeq, flowRecipe, slotNo);

        WaferDetailDTO data = new WaferDetailDTO();
        data.setWaferInspections(new ArrayList<>());

        Set<DiePos>[] sets = new HashSet[3];
        for (int i = 0; i < 3; i++) {
            sets[i] = new HashSet<>();
        }

        PathFinder pathFinder = new PathFinder(
            FlowRecipe.findByPpid(flowRecipe),
            lotSeq.toString(),
            lotId,
            slotNo,
            waferSummary.getDate()
        );


        for (int i = 0; i < 3; i++) {

            String path = null;

            switch (i){
                case 0:
                    path = pathFinder.getSmfPath(pathFinder.getInPath());
                    break;
                case 1:
                    path = pathFinder.getSmfPath(pathFinder.getEwimPath());
                    break;
                case 2:
                    path = pathFinder.getSmfPath(pathFinder.getOutPath());
                    break;
            }

            WaferInspectionDTO waferInspectionDTO = WaferInspectionFileReader.readFile(path);



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
            waferInspectionDTO.setModuleId(waferSummary.getModules()[i].getModuleId());
            waferInspectionDTO.setEventDtts(waferSummary.getModules()[i].getEventDtts());

            data.getWaferInspections().add(waferInspectionDTO);

        }


        return data;
    }


}
