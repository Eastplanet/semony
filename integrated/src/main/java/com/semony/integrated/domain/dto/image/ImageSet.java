package com.semony.integrated.domain.dto.image;

import java.util.List;
import lombok.Data;

@Data
public class ImageSet {
    ImageData Golden;
    ImageData EBR;
    ImageData Macro;
    List<IPU> ipus;
}



