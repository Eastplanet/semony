package com.semony.integrated.application.image;

import com.semony.integrated.domain.dto.image.ImageSet;
import java.math.BigDecimal;

public interface ImageEncoder {
    public ImageSet encode(String lotId, BigDecimal lotSeq, String flowRecipe, String slotNo);
}
