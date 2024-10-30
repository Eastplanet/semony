package com.semony.maker.application.service;

import com.semony.maker.domain.dto.RecipeCombination;

public interface MappingTableService {

    public RecipeCombination generateCombination(String recipe);
}
