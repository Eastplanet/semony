package com.semony.maker;

import com.semony.maker.application.service.LotServiceImpl;
import com.semony.maker.domain.document.LotMetadata;
import com.semony.maker.domain.repository.LotMetadataRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LotServiceImplTest {

    @Mock
    private LotMetadataRepository lotMetadataRepository;

    @InjectMocks
    private LotServiceImpl lotService;

    private LotMetadata metadata;

    @BeforeEach
    void setUp() {
        metadata = new LotMetadata();
        metadata.setLastLotId(100L);
        metadata.setLastLotSeq(200L);
    }

    @Test
    void testGenerateLotId() {
        // Arrange
        when(lotMetadataRepository.findTopByOrderByLastLotIdDesc()).thenReturn(metadata);
        String expectedTimestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmm"));
        String expectedLotId = "LP2" + expectedTimestamp + "_PJ2@" + (metadata.getLastLotId() + 1);

        // Act
        String lotId = lotService.generateLotId();

        // Assert
        assertEquals(expectedLotId, lotId);
        verify(lotMetadataRepository, times(1)).findTopByOrderByLastLotIdDesc();
        verify(lotMetadataRepository, times(1)).save(any(LotMetadata.class));
    }

    @Test
    void testGenerateLotSeq() {
        // Arrange
        when(lotMetadataRepository.findTopByOrderByLastLotSeqDesc()).thenReturn(metadata);
        Long expectedLotSeq = metadata.getLastLotSeq() + 1;

        // Act
        Long lotSeq = lotService.generateLotSeq();

        // Assert
        assertEquals(expectedLotSeq, lotSeq);
        verify(lotMetadataRepository, times(1)).findTopByOrderByLastLotSeqDesc();
        verify(lotMetadataRepository, times(1)).save(any(LotMetadata.class));
    }
}
