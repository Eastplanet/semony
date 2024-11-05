package com.semony.maker.application.service;

import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LotTransactionServiceImpl implements LotTransactionService{

    private final LotMetadataRepository lotMetadataRepository;

    @Transactional
    public void updateLastLotId(Long newLastLotId) {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotIdDesc();
        metadata.updateLastLotId(newLastLotId);
        lotMetadataRepository.save(metadata);
    }

    @Transactional
    public void updateLastLotSeq(Long newLastLotSeq) {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotSeqDesc();
        metadata.updateLastLotSeq(newLastLotSeq);
        lotMetadataRepository.save(metadata);
    }
}
