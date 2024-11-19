package com.semony.integrated.domain.dto;

import com.semony.integrated.domain.dto.json.EbrResultJson;
import com.semony.integrated.domain.dto.json.ResultJson;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO.DieLocation;
import com.semony.integrated.domain.dto.smf.WaferInspectionSummaryDTO;
import java.util.List;
import lombok.Data;

@Data
public class WaferDetailDTO {
    public List<DieLocation> dieLocations;
    public List<WaferInspectionDTO> waferInspections;
    public List<WaferInspectionSummaryDTO> waferInspectionSummaryDTO;
}