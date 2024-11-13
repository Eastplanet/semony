package com.semony.integrated.presentation;

import com.semony.integrated.application.NetworkHealthChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class ModuleHealthController {

    private final NetworkHealthChecker networkHealthChecker;

    @GetMapping()
    public ResponseEntity<?> getModuleHealth() {
        return ResponseEntity.ok(networkHealthChecker.getModuleHealth());
    }
}
