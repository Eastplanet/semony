package com.semony.integrated.application.image;

import com.semony.integrated.domain.dto.image.ImageSet;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface ImageEncoder {
    public List<ImageSet> encode(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo, LocalDateTime date);
}
