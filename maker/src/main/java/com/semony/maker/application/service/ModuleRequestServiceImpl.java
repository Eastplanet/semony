package com.semony.maker.application.service;

import com.semony.maker.domain.dto.ModuleRequestPayload;
import com.semony.maker.global.constants.Constants;
import com.semony.maker.global.error.ErrorCode;
import com.semony.maker.global.error.exception.BusinessException;
import java.time.LocalDate;
import java.util.Map;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ModuleRequestServiceImpl implements ModuleRequestService {

    private final WebClient webClient;
    private static final String MODULE_DATA_URI = "/modules/data";

    public ModuleRequestServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }

    public Map<String, Long> sendModuleRequest(String moduleName, LocalDate date, String lotId,
        String flowRecipe, long lotSeq, int slotNo,
        String localFolderPath, String macroFolder, String selectedSubfolder) {

        // 모듈 IP 확인
        String moduleIp = Constants.MODULE_IPS.get(moduleName);
        if (moduleIp == null) {
            throw new BusinessException(moduleName, "moduleName", ErrorCode.MODULE_IP_NOT_FOUND);
        }

        ModuleRequestPayload payload = ModuleRequestPayload.builder()
            .moduleName(moduleName)
            .date(date.toString().replace("-", ""))
            .lotId(lotId)
            .flowRecipe(flowRecipe)
            .lotSeq(String.valueOf(lotSeq))
            .slotNo(String.valueOf(slotNo))
            .localFolderPath(localFolderPath)
            .macroFolder(macroFolder)
            .selectedSubfolder(selectedSubfolder)
            .build();

        try {
            Mono<Map<String, Long>> defectDataMono = webClient.post()
                .uri(MODULE_DATA_URI)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Long>>() {
                });

            return defectDataMono.block();
        } catch (Exception e) {
            throw new BusinessException(moduleName, "moduleRequest",
                ErrorCode.MODULE_REQUEST_FAILED);
        }
    }
}
