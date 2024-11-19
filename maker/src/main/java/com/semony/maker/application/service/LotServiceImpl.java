package com.semony.maker.application.service;

import static com.semony.maker.global.constants.Constants.TIMESTAMP_PATTERN;

import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LotServiceImpl implements LotService {

    private final LotMetadataRepository lotMetadataRepository;
    private final LotTransactionService lotTransactionService;

    @Override
    public String generateLotId() {
        Long newLastLotId = getNextLotId();
        lotTransactionService.updateLastLotId(newLastLotId);
        return String.valueOf(newLastLotId);
    }

    @Override
    public Long generateLotSeq() {
        Long newLastLotSeq = getNextLotSeq();
        lotTransactionService.updateLastLotSeq(newLastLotSeq);
        return newLastLotSeq;
    }

    private Long getNextLotId() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotIdDesc();
        return (metadata != null) ? metadata.getLastLotId() + 1 : 1L;
    }

    private Long getNextLotSeq() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotSeqDesc();
        return (metadata != null) ? metadata.getLastLotSeq() + 1 : 1L;
    }

    private String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN));
    }
}
