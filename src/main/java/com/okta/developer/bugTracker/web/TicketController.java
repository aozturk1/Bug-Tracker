package com.okta.developer.bugTracker.web;

import com.okta.developer.bugTracker.model.Ticket;
import com.okta.developer.bugTracker.model.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TicketController {
    private final Logger log = LoggerFactory.getLogger(TicketController.class);
    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/tickets")
    public Collection<Ticket> tickets() {
        return ticketRepository.findAll();
    }

    @GetMapping("/ticket/{id}")
    public ResponseEntity<?> getTicket(@PathVariable Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        return ticket.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/ticket")
    public ResponseEntity<Ticket> createTicket(@Valid @RequestBody Ticket ticket) throws URISyntaxException{
        log.info("Request to create ticket: {}", ticket);
        Ticket result = ticketRepository.save(ticket);
        return ResponseEntity.created(new URI("/api/ticket/" + result.getId()))
                .body(result);
    }

    @PutMapping("/ticket/{id}")
    public ResponseEntity<Ticket> updateTicket(@Valid @RequestBody Ticket ticket) {
        log.info("Request to update ticket: {}", ticket);
        Ticket result = ticketRepository.save(ticket);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/ticket/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        log.info("Request to delete ticket: {}", id);
        ticketRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
