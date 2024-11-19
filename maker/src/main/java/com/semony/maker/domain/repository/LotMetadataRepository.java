package com.semony.maker.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.semony.maker.domain.document.LotMetadata;

@Repository
public interface LotMetadataRepository extends MongoRepository<LotMetadata, String> {
    LotMetadata findTopByOrderByLastLotIdDesc();
    LotMetadata findTopByOrderByLastLotSeqDesc();
}
