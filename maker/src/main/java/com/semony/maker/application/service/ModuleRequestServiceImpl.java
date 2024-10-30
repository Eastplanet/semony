package com.semony.maker.application.service;

import com.semony.maker.global.constants.ModuleConstants;
import com.sun.jdi.InvalidModuleException;
import java.time.LocalDate;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ModuleRequestServiceImpl implements ModuleRequestService {

    private final WebClient webClient;

    public ModuleRequestServiceImpl(WebClient webClient) {
        this.webClient = webClient;
    }

    public void sendModuleRequest(String moduleName, LocalDate time) {
        String moduleIp = ModuleConstants.MODULE_IPS.get(moduleName);
        if (moduleIp == null) {
            throw new InvalidModuleException("Invalid module name: " + moduleName);
        }

        webClient.post()
            .uri(moduleIp + "/execute")
            .bodyValue(Map.of("moduleName", moduleName, "time", time))
            .retrieve()
            .toBodilessEntity()
            .block();
    }
}
