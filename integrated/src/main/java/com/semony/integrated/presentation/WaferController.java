package com.semony.integrated.presentation;

import com.semony.integrated.application.WaferService;
import com.semony.integrated.application.parser.JsonParser;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.dto.WaferDetailDTO;
import com.semony.integrated.domain.dto.smf.WaferInspectionDTO;
import com.semony.integrated.domain.dto.json.ResultJson;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wafer")
@RequiredArgsConstructor
public class WaferController {

    private final WaferService waferService;

    @GetMapping()
    public ResponseEntity<List<SummaryWaferDto>> waferList(@RequestParam LocalDateTime startDate,
        @RequestParam LocalDateTime endDate) {
        List<SummaryWaferDto> waferSummaryList = waferService.getWaferSummaryList(startDate, endDate);
        return ResponseEntity.ok(waferSummaryList);
    }

    @GetMapping("/detail")
    public ResponseEntity<WaferDetailDTO> waferDetail(@RequestParam(value = "ppid")String ppid, @RequestParam(value = "lotId")String lotId,@RequestParam(value = "lotSeq")BigDecimal lotSeq, @RequestParam(value = "slotNo")String slotNo){

        WaferDetailDTO waferDetail = null;

        try {
            waferDetail = waferService.getWaferDetail(lotId, lotSeq, ppid, slotNo);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(waferDetail);
    }
}

