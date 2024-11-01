package com.semony.integrated.presentation;

import com.semony.integrated.application.WaferService;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import java.math.BigDecimal;
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
    public ResponseEntity<?> waferList(@RequestParam(value = "ppid") String ppid,
        @RequestParam(value = "lotId") String lotId,
        @RequestParam(value = "lotSeq") BigDecimal lotSeq,
        @RequestParam(value = "slotNo") String slotNo) {
        SummaryWaferDto waferSummaryList = waferService.getWaferSummary(lotId, lotSeq, ppid,
            slotNo);
        return ResponseEntity.ok(waferSummaryList);
    }
}
