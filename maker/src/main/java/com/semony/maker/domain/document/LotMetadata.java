package com.semony.maker.domain.document;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lot_metadata")
@Getter
public class LotMetadata {

    @Id
    private String id;
    private Long lastLotId;
    private Long lastLotSeq;

    public void updateLastLotId(Long newLastLotId) {
        if (newLastLotId != null && (lastLotId == null || newLastLotId > lastLotId)) {
            this.lastLotId = newLastLotId;
        }
    }

    public void updateLastLotSeq(Long newLastLotSeq) {
        if (newLastLotSeq != null && (lastLotSeq == null || newLastLotSeq > lastLotSeq)) {
            this.lastLotSeq = newLastLotSeq;
        }
    }
}
