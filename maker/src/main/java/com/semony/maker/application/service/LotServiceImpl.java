package com.semony.maker.application.service;

import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LotServiceImpl implements LotService {

    private final LotMetadataRepository lotMetadataRepository;

    @Autowired
    public LotServiceImpl(LotMetadataRepository lotMetadataRepository) {
        this.lotMetadataRepository = lotMetadataRepository;
    }

    @Override
    public String generateLotId() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotIdDesc();

        // lotId 생성
        Long newLastLotId = metadata.getLastLotId() + 1;
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmm"));
        String lotId = "LP2" + timestamp + "_PJ2@" + newLastLotId;

        // lastLotId 업데이트
        updateLastLotId(newLastLotId);

        return lotId;
    }
}
