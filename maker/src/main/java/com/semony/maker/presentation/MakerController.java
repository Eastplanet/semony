package com.semony.maker.presentation;

import static com.semony.maker.global.constants.Constants.MAX_SLOT_COUNT;

import com.semony.maker.application.processor.InspectionProcessor;
import com.semony.maker.application.service.LotService;
import com.semony.maker.global.success.SuccessMessage;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MakerController {

    private final InspectionProcessor inspectionProcessor;
    private final LotService lotService;

    @Autowired
    public MakerController(InspectionProcessor inspectionProcessor, LotService lotService) {
        this.inspectionProcessor = inspectionProcessor;
        this.lotService = lotService;
    }

    @PostMapping("/make")
    public ResponseEntity<?> makeInspectionData(@RequestParam String recipe,
        @RequestParam LocalDateTime requestTime,
        @RequestParam int slotId) {
        inspectionProcessor.processInspection(recipe, requestTime, slotId);
        return ResponseEntity.ok(SuccessMessage.INSPECTION_DATA_CREATION_SUCCESS + recipe);
    }

    @PostMapping("/make/lot")
    public ResponseEntity<?> makeInspectionData(@RequestParam String recipe,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime requestTime) {
        String lotId = lotService.generateLotId();
        long lotSeq = lotService.generateLotSeq();
        for (int i = 0; i < MAX_SLOT_COUNT; i++) {
            inspectionProcessor.processInspection(recipe, requestTime, i, lotId, lotSeq);
        }
        return ResponseEntity.ok(SuccessMessage.INSPECTION_DATA_CREATION_SUCCESS + recipe);
    }


    @PostMapping("/make/test")
    public ResponseEntity<?> makeInspectionData(@RequestParam LocalDateTime requestTime) {
        for (int j = 0; j < 16; j++) {
            String recipeKey = j + "TT_EWIM_NO_CHHP";
            for (int i = 0; i < MAX_SLOT_COUNT; i++) {
                inspectionProcessor.processInspection(recipeKey, requestTime, i);
            }
        }
        return ResponseEntity.ok(SuccessMessage.INSPECTION_DATA_CREATION_SUCCESS);
    }

}
