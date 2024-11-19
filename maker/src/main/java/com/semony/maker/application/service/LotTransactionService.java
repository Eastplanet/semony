package com.semony.maker.application.service;

public interface LotTransactionService {

    public void updateLastLotId(Long newLastLotId);

    public void updateLastLotSeq(Long newLastLotSeq);
}
