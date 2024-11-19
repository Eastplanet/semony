package com.semony.maker;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.semony.maker.application.service.LoggingService;
import com.semony.maker.application.service.LoggingServiceImpl;
import com.semony.maker.application.service.LotServiceImpl;
import com.semony.maker.application.service.LotTransactionServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MakerApplicationTests {

	@Autowired
	private LotServiceImpl lotService;

	@Autowired
	private LoggingServiceImpl LoggingService;

	@Autowired
	private LotTransactionServiceImpl lotTransactionService;

	@Test
	void contextLoads() {
		// Ensure that the application context loads without issues
	}

	@Test
	void lotServiceIsLoaded() {
		assertNotNull(lotService, "LotServiceImpl should be loaded in the application context");
	}

	@Test
	void loggingserviceIsLoaded() {
		assertNotNull(LoggingService, "LotTransactionServiceImpl should be loaded in the application context");
	}

	@Test
	void lotTransactionServiceIsLoaded() {
		assertNotNull(lotTransactionService, "LotTransactionServiceImpl should be loaded in the application context");
	}

}
