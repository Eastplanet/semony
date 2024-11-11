package com.semony.integrated.application;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class NetworkHealthChecker {

    private final List<ModuleMapping> moduleMappings = List.of(
        new ModuleMapping("MIW7-51", "3.36.54.152", "8081", false),
        new ModuleMapping("EWIM1-46", "3.36.54.152", "8084", false),
        new ModuleMapping("EWIM1-36", "3.36.54.152", "8083", false),
        new ModuleMapping("MIW7-61", "3.36.54.152", "8082", false),
        new ModuleMapping("EWIM2-46", "3.36.105.208", "8084", false),
        new ModuleMapping("MIW7-52", "3.36.105.208", "8081", false),
        new ModuleMapping("EWIM2-36", "3.36.105.208", "8083", false),
        new ModuleMapping("MIW7-62", "3.36.105.208", "8082", false)
    );

    @Scheduled(fixedRate = 10000)
    public void repeat(){
        // 각 모듈의 헬스 체크 수행
        System.out.println("수행 시작");
        for (ModuleMapping module : moduleMappings) {
            module.setHealthy(isPortAvailable(module.getIp(), Integer.parseInt(module.getPort())));
        }
    }

    private boolean isPortAvailable(String host, int port) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), 1000); // 1초 타임아웃 설정
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    public List<ModuleMapping> getModuleHealth(){
        return moduleMappings;
    }
}



@AllArgsConstructor
@NoArgsConstructor
@Data
class ModuleMapping {
    String moduleId;
    String ip;
    String port;
    boolean isHealthy;
}
