package com.semony.integrated.domain.dto.convertor;

import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.entity.EqpInspectionHstAlpha;
import com.semony.integrated.domain.entity.FlowRecipe;
import java.util.List;
import java.util.NoSuchElementException;

public class EqpInspectionHstAlphaConvertor {

    public static SummaryWaferDto convert(List<EqpInspectionHstAlpha> inspectionList,
        String flowRecipe) {

        SummaryWaferDto dto = new SummaryWaferDto();
        SummaryWaferDto.Module[] list = new SummaryWaferDto.Module[3];

        Long totalDefectCount = 0L;

        FlowRecipe byPpid = FlowRecipe.findByPpid(flowRecipe);

        for (EqpInspectionHstAlpha inspection : inspectionList) {

            totalDefectCount += inspection.getDefectCount();

            if (!isValid(inspection)) {
                throw new NoSuchElementException();
            }

            SummaryWaferDto.Module data = new SummaryWaferDto.Module();
            data.setDefect(inspection.getDefectCount());
            data.setModuleId(inspection.getModuleId());
            data.setEventDtts(inspection.getEventDtts());

            if (byPpid.getIn().equals(inspection.getModuleId())) {
                list[0] = data;
            } else if (byPpid.getEwim().equals(inspection.getModuleId())) {
                list[1] = data;
            } else if (byPpid.getOut().equals(inspection.getModuleId())) {
                list[2] = data;
            }

            dto.setPpid(inspection.getFlowRecipe());
            dto.setLotId(inspection.getLotId());
            dto.setLotSeq(inspection.getLotSeq());
            dto.setSlotNo(Integer.parseInt(inspection.getSlotNo()));

        }

        // Set defect counts
        dto.setTotalDefectCount(totalDefectCount);
        dto.setModules(list);

        return dto;
    }

    public static boolean isValid(EqpInspectionHstAlpha item) {
        return item != null &&
            item.getLotId() != null &&
            item.getLotSeq() != null &&
            item.getSlotNo() != null &&
            item.getFlowRecipe() != null &&
            item.getModuleId() != null &&
            item.getCreateDtts() != null &&
            item.getEventDtts() != null;
    }
}
