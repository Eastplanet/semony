package com.semony.maker.presentation;

import com.semony.maker.application.processor.InspectionProcessor;
import com.semony.maker.global.success.SuccessMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping
public class MakerController {

    private final InspectionProcessor inspectionProcessor;

    @Autowired
    public MakerController(InspectionProcessor inspectionProcessor) {
        this.inspectionProcessor = inspectionProcessor;
    }

    @PostMapping("/make")
    public ResponseEntity<?> makeInspectionData(@RequestParam String recipe,
        @RequestParam LocalDate requestTime,
        @RequestParam int slotId) {
        inspectionProcessor.processInspection(recipe, requestTime, slotId);
        return ResponseEntity.ok(SuccessMessage.INSPECTION_DATA_CREATION_SUCCESS + recipe);
    }
}
