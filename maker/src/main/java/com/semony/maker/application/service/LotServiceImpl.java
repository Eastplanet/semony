package com.semony.maker.application.service;

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

    /**
     * LotId를 가져오고 새로 갱신합니다.
     * @return
     */
    @Override
    public String generateLotId() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotIdDesc();

        Long newLastLotId = metadata.getLastLotId() + 1;
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHH"));
        String lotId = "LP2" + timestamp + "_PJ2@" + newLastLotId;

        lotTransactionService.updateLastLotId(newLastLotId);

        return lotId;
    }

    /**
     * LotSeq를 가져오고 새로 갱신합니다.
     * @return
     */
    @Override
    public Long generateLotSeq() {
        LotMetadata metadata = lotMetadataRepository.findTopByOrderByLastLotSeqDesc();

        Long newLastLotSeq = metadata.getLastLotSeq() + 1;
        lotTransactionService.updateLastLotSeq(newLastLotSeq);

        return newLastLotSeq;
    }
}
