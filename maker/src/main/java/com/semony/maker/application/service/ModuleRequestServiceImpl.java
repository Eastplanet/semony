package com.semony.maker.application.service;

import com.semony.maker.domain.dto.ModuleRequestPayload;
import com.semony.maker.global.error.ErrorCode;
import com.semony.maker.global.error.exception.BusinessException;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ModuleRequestServiceImpl implements ModuleRequestService {

    private final WebClient.Builder webClientBuilder;

    // application.yml에 정의된 모듈별 IP 주소를 주입
    @Value("${module.miw7_51}")
    private String miw7_51;

    @Value("${module.miw7_52}")
    private String miw7_52;

    @Value("${module.miw7_61}")
    private String miw7_61;

    @Value("${module.miw7_62}")
    private String miw7_62;

    @Value("${module.ewim1_36}")
    private String ewim1_36;

    @Value("${module.ewim1_46}")
    private String ewim1_46;

    @Value("${module.ewim2_36}")
    private String ewim2_36;

    @Value("${module.ewim2_46}")
    private String ewim2_46;

    private static final String MODULE_DATA_URI = "/modules/data";

    public ModuleRequestServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public Map<String, Long> sendModuleRequest(String moduleName, LocalDateTime date, String lotId,
        String flowRecipe, long lotSeq, int slotNo,
        String localFolderPath, String macroFolder, String selectedSubfolder) {

        // moduleName에 따른 IP 주소 매핑
        String moduleIp;
        switch (moduleName) {
            case "MIW7-51":
                moduleIp = miw7_51;
                break;
            case "MIW7-52":
                moduleIp = miw7_52;
                break;
            case "MIW7-61":
                moduleIp = miw7_61;
                break;
            case "MIW7-62":
                moduleIp = miw7_62;
                break;
            case "EWIM1-36":
                moduleIp = ewim1_36;
                break;
            case "EWIM1-46":
                moduleIp = ewim1_46;
                break;
            case "EWIM2-36":
                moduleIp = ewim2_36;
                break;
            case "EWIM2-46":
                moduleIp = ewim2_46;
                break;
            default:
                throw new BusinessException(moduleName, "moduleName",
                    ErrorCode.MODULE_IP_NOT_FOUND);
        }

        // IP 주소 확인
        if (moduleIp == null) {
            throw new BusinessException(moduleName, "moduleName", ErrorCode.MODULE_IP_NOT_FOUND);
        }

        // 요청 payload 생성
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
            // 동적으로 설정된 moduleIp로 WebClient 생성
            WebClient webClient = webClientBuilder.baseUrl(moduleIp).build();

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
