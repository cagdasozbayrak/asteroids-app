package com.example.backend.config;

import com.google.common.util.concurrent.RateLimiter;
import io.netty.channel.ChannelOption;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.netty.http.client.HttpClient;

@Configuration
public class NASAWebClientConfig {
    private static final String API_KEY_PARAM = "api_key";
    @Value("${nasa.url}")
    private String apiUrl;

    @Value("${nasa.apikey}")
    private String apiKey;

    @Value("${nasa.ratelimit}")
    private int rateLimit;

  @Value("${nasa.timeoutMillis}")
  private int timeout;

  @Bean
  public WebClient nasaWebClient() {
      var httpClient = HttpClient.create()
              .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, timeout)
              .responseTimeout(Duration.ofMillis(timeout));
      return WebClient.builder()
        .clientConnector(new ReactorClientHttpConnector(httpClient))
        .baseUrl(apiUrl)
              .filter((request,next) -> {
                  var uriBuilder = UriComponentsBuilder.fromUri(request.url());
                  uriBuilder.queryParam(API_KEY_PARAM, apiKey);
                  return next.exchange(ClientRequest.from(request).url(uriBuilder.build().toUri()).build());
              })
        .build();
    }

    @Bean
    public RateLimiter nasaWebClientRateLimiter()
    {
      return RateLimiter.create(rateLimit);
    }
}
