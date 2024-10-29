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

    @Override
    public Long generateLotSeq() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotSeqDesc();

        // lastLotSeq 업데이트 및 반환
        Long newLastLotSeq = metadata.getLastLotSeq() + 1;
        updateLastLotSeq(newLastLotSeq);

        return newLastLotSeq;
    }

    @Transactional
    public void updateLastLotId(Long newLastLotId) {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotIdDesc();
        metadata.setLastLotId(newLastLotId);
        lotMetadataRepository.save(metadata);
    }

    @Transactional
    public void updateLastLotSeq(Long newLastLotSeq) {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotSeqDesc();
        metadata.setLastLotSeq(newLastLotSeq);
        lotMetadataRepository.save(metadata);
    }
}
