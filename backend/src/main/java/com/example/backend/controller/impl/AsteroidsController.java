package com.example.backend.controller.impl;

import com.example.backend.controller.IAsteroidsController;
import com.example.backend.service.AsteroidsService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AsteroidsController implements IAsteroidsController {
  private final AsteroidsService asteroidsService;

  @Override
  public ResponseEntity<Flux> feed(LocalDate startDate, LocalDate endDate) {
    return ResponseEntity.ok().body(asteroidsService.fetchFeed(startDate, endDate));
  }
}
