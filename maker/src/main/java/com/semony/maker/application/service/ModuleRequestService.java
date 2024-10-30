package com.semony.maker.application.service;

import java.time.LocalDate;

public interface ModuleRequestService {

    public void sendModuleRequest(String moduleName, LocalDate time);
}
