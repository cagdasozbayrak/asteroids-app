package com.example.backend.controller;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Flux;

public interface IAsteroidsController {

    @GetMapping("/feed")
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    ResponseEntity<Flux> feed(@RequestParam("start_date") LocalDate startDate, @RequestParam(value = "end_date", required = false) LocalDate endDate);
}
