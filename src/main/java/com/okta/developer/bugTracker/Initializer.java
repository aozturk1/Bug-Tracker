package com.okta.developer.bugTracker;

import com.okta.developer.bugTracker.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class Initializer implements CommandLineRunner {

    private final TicketRepository ticketRepository;

    public Initializer(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) throws Exception {
//        // Create Users
//        User user1 = new User("John", "john.doe@example.com");
//        User user2 = new User("Jane", "jane.smith@example.com");
//        userRepository.save(user1);
//        userRepository.save(user2);
//
//        // Create Teams
//        Team team1 = new Team("Alpha Team");
//        Team team2 = new Team("Beta Team");
//        teamRepository.save(team1);
//        teamRepository.save(team2);
//
//        // Create Projects
//        Project project1 = new Project("Bug Tracker", team1);
//        Project project2 = new Project("Website Redesign", team2);
//        projectRepository.save(project1);
//        projectRepository.save(project2);
//
        //Create Tickets
        Ticket ticket = Ticket.builder()
                .title("404 Error")
                .date(Instant.now())
                .description("Page not found")
                .priority(Level.LOW)
                .build();
        ticketRepository.save(ticket);
    }
}
