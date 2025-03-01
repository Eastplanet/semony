package com.semony.integrated.presentation;

import com.semony.integrated.application.WaferService;
import com.semony.integrated.application.image.ImageEncoder;
import com.semony.integrated.domain.dto.SummaryWaferDto;
import com.semony.integrated.domain.dto.WaferDetailDTO;
import com.semony.integrated.domain.dto.image.ImageSet;
import com.semony.integrated.domain.dto.json.EbrResultJson;
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
@RequestMapping("/api/wafer")
@RequiredArgsConstructor
public class WaferController {

    private final WaferService waferService;
    private final ImageEncoder imageEncoder;

    @GetMapping()
    public ResponseEntity<List<SummaryWaferDto>> waferList(@RequestParam LocalDateTime startDate,
        @RequestParam LocalDateTime endDate) {
        List<SummaryWaferDto> waferSummaryList = waferService.getWaferSummaryList(startDate,
            endDate);
        return ResponseEntity.ok(waferSummaryList);
    }

    @GetMapping("/detail")
    public ResponseEntity<WaferDetailDTO> waferDetail(@RequestParam(value = "ppid") String ppid,
        @RequestParam(value = "lotId") String lotId,
        @RequestParam(value = "lotSeq") BigDecimal lotSeq,
        @RequestParam(value = "slotNo") String slotNo,
        @RequestParam(value = "date") LocalDateTime date) {

        WaferDetailDTO waferDetail = null;

        try {
            waferDetail = waferService.getWaferDetail(lotId, lotSeq, ppid, slotNo);
            return ResponseEntity.ok(waferDetail);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/detail/result")
    public ResponseEntity<EbrResultJson> waferDetailResult(@RequestParam(value = "ppid") String ppid,
        @RequestParam(value = "lotId") String lotId,
        @RequestParam(value = "lotSeq") BigDecimal lotSeq,
        @RequestParam(value = "slotNo") String slotNo,
        @RequestParam(value = "date") LocalDateTime date){

        EbrResultJson ebrResultJson = null;
        try {
            ebrResultJson = waferService.getWaferDetailResult(lotId, lotSeq, ppid, slotNo);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(ebrResultJson);

    }



    @GetMapping("/images")
    public ResponseEntity<?> getImages(@RequestParam(value = "ppid") String ppid,
        @RequestParam(value = "lotId") String lotId,
        @RequestParam(value = "lotSeq") BigDecimal lotSeq,
        @RequestParam(value = "slotNo") String slotNo,
        @RequestParam(value = "date") LocalDateTime date) {


        List<ImageSet> encode = imageEncoder.encode(lotId, lotSeq, ppid, slotNo, date);

        return ResponseEntity.ok(encode);
    }

    @GetMapping("/images/summary")
    public ResponseEntity<?> getImagesSummary(@RequestParam(value = "ppid") String ppid,
        @RequestParam(value = "lotId") String lotId,
        @RequestParam(value = "lotSeq") BigDecimal lotSeq,
        @RequestParam(value = "slotNo") String slotNo,
        @RequestParam(value = "date") LocalDateTime date) {
        List<ImageSet> encode = imageEncoder.encodeSummary(lotId, lotSeq, ppid, slotNo, date);
        return ResponseEntity.ok(encode);
    }



}

