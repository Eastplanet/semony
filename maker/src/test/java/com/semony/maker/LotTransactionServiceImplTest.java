package com.semony.maker;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.semony.maker.application.service.LotTransactionServiceImpl;
import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LotTransactionServiceImplTest {

    @Mock
    private LotMetadataRepository lotMetadataRepository;

    @InjectMocks
    private LotTransactionServiceImpl lotTransactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateLastLotId() {
        // Given
        Long newLastLotId = 123456L;
        LotMetadata metadata = new LotMetadata();
        when(lotMetadataRepository.findTopByOrderByLastLotIdDesc()).thenReturn(metadata);

        // When
        lotTransactionService.updateLastLotId(newLastLotId);

        // Then
        verify(lotMetadataRepository).save(metadata);
        assert(metadata.getLastLotId().equals(newLastLotId));
    }

    @Test
    void testUpdateLastLotSeq() {
        // Given
        Long newLastLotSeq = 789012L;
        LotMetadata metadata = new LotMetadata();
        when(lotMetadataRepository.findTopByOrderByLastLotSeqDesc()).thenReturn(metadata);

        // When
        lotTransactionService.updateLastLotSeq(newLastLotSeq);

        // Then
        verify(lotMetadataRepository).save(metadata);
        assert(metadata.getLastLotSeq().equals(newLastLotSeq));
    }
}
