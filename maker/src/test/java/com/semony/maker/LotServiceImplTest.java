package com.semony.maker;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.semony.maker.application.service.LotServiceImpl;
import com.semony.maker.application.service.LotTransactionServiceImpl;
import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LotServiceImplTest {

    @Mock
    private LotMetadataRepository lotMetadataRepository;

    @Mock
    private LotTransactionServiceImpl lotTransactionServiceImpl;

    @InjectMocks
    private LotServiceImpl lotService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGenerateLotId() {
        // Given
        LotMetadata metadata = new LotMetadata();
        metadata.updateLastLotId(123456L);
        when(lotMetadataRepository.findTopByOrderByLastLotIdDesc()).thenReturn(metadata);

        // Expected newLastLotId and formatted lotId
        Long expectedNewLastLotId = 123457L;
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHH"));
        String expectedLotId = "LP2" + timestamp + "_PJ2@" + expectedNewLastLotId;

        // When
        String actualLotId = lotService.generateLotId();

        // Then
        assertEquals(expectedLotId, actualLotId);
        verify(lotTransactionServiceImpl).updateLastLotId(expectedNewLastLotId);
    }

    @Test
    void testGenerateLotSeq() {
        // Given
        LotMetadata metadata = new LotMetadata();
        metadata.updateLastLotSeq(789012L);
        when(lotMetadataRepository.findTopByOrderByLastLotSeqDesc()).thenReturn(metadata);

        // Expected newLastLotSeq
        Long expectedNewLastLotSeq = 789013L;

        // When
        Long actualLotSeq = lotService.generateLotSeq();

        // Then
        assertEquals(expectedNewLastLotSeq, actualLotSeq);
        verify(lotTransactionServiceImpl).updateLastLotSeq(expectedNewLastLotSeq);
    }
}
