package com.example.backend.service;

import com.google.common.util.concurrent.RateLimiter;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class AsteroidsService {
    private static final String FEED_URI = "feed";
    private static final String LOOKUP_URI = "neo";
    private static final String BROWSE_URI = "neo/browse";
    private final WebClient nasaWebClient;
    private final RateLimiter nasaWebClientRateLimiter;

    @Cacheable("feed-cache")
    public Flux<Object> fetchFeed(LocalDate startDate, LocalDate endDate)
    {
    return nasaWebClient
        .get()
        .uri(uriBuilder -> uriBuilder.path(FEED_URI).queryParam("start_date", startDate).queryParam("end_date", endDate).build())
        .retrieve()
        .bodyToFlux(Object.class).doOnComplete(nasaWebClientRateLimiter::acquire);
    }
}
