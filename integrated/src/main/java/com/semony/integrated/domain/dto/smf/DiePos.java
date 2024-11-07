package com.semony.integrated.domain.dto.smf;

import java.util.Objects;
import lombok.Data;

@Data
public class DiePos {
    private Integer XIndex;
    private Integer YIndex;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DiePos diePos = (DiePos) o;
        return Objects.equals(XIndex, diePos.XIndex) && Objects.equals(YIndex,
            diePos.YIndex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(XIndex, YIndex);
    }
}
