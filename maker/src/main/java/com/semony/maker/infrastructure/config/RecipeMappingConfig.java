package com.semony.maker.infrastructure.config;

import com.semony.maker.domain.provider.RecipeMappingProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RecipeMappingConfig {

    @Bean
    public RecipeMappingProvider recipeMappingProvider() {
        return new RecipeMappingProvider();
    }
}