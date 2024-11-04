package com.semony.maker.application.service;

import com.semony.maker.global.constants.ModuleConstants;
import java.time.LocalDate;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ModuleRequestServiceImpl implements ModuleRequestService {

    private final WebClient webClient;

    public ModuleRequestServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }

    public void sendModuleRequest(String moduleName, LocalDate date, String lotId,
        String flowRecipe,
        long lotSeq, int slotNo, String localFolderPath, String macroFolder,
        String selectedSubfolder) {
//        System.out.println(moduleName);
        // 모듈 IP 확인
        String moduleIp = ModuleConstants.MODULE_IPS.get(moduleName);
//        System.out.println(moduleIp);
        if (moduleIp == null) {
            throw new IllegalArgumentException("Invalid module name: " + moduleName);
        }
        Map<String, Object> requestBody = Map.of(
            "module_name", moduleName,
            "date", date.toString().replace("-", ""),
            "lotId", lotId,
            "flow_recipe", flowRecipe,
            "lotSeq", String.valueOf(lotSeq),  // Ensure lotSeq is a String
            "slotNo", String.valueOf(slotNo),  // Ensure slotNo is a String
            "local_folder_path", localFolderPath,
            "macro_folder", macroFolder,
            "selected_subfolder", selectedSubfolder
        );

//        System.out.println("Request Body: " + requestBody);

        // WebClient로 POST 요청 전송
        webClient.post()
            .uri("/modules/data")
            .bodyValue(requestBody)
            .retrieve()
            .toBodilessEntity()
            .block();
    }
}
