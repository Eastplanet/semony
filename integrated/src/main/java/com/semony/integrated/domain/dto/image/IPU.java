package com.semony.integrated.domain.dto.image;

import java.util.List;
import lombok.Data;

@Data
public class IPU{
    Integer ipuNum;
    List<ImageData> images;
}