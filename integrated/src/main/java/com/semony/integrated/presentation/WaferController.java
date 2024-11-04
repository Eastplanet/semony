package com.semony.integrated.presentation;

import com.semony.integrated.application.WaferService;
import com.semony.integrated.domain.dto.SummaryWaferDto;
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

}
