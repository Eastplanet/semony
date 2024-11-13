package com.semony.integrated.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ModuleMapping {
    String moduleId;
    String ip;
    String port;
    boolean isHealthy;
}