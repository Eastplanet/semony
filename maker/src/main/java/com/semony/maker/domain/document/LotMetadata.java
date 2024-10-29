package com.semony.maker.domain.document;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lot_metadata")
@Getter
@Setter
public class LotMetadata {

    @Id
    private String id;
    private Long lastLotId;
    private Long lastLotSeq;
}
