package com.okta.developer.bugTracker;

import com.okta.developer.bugTracker.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Set;

@Component
public class Initializer implements CommandLineRunner {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public Initializer(TicketRepository ticketRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create Users
        User user1 = new User(null, "John Doe", "john.doe@example.com", Role.Admin, null, null);
        User user2 = new User(null, "Jane Smith", "jane.smith@example.com", Role.User, null, null);
        User user3 = new User(null, "Mike Johnson", "mike.johnson@example.com", Role.User, null, null);
        User user4 = new User(null, "Alice Brown", "alice.brown@example.com", Role.User, null, null);
        User user5 = new User(null, "Bob White", "bob.white@example.com", Role.User, null, null);
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);
        userRepository.save(user5);

        //Create Tickets
        Ticket ticket = Ticket.builder()
                .title("404 Error")
                .date(Instant.now())
                .description("Page not found")
                .priority(Level.LOW)
                .build();
        ticketRepository.save(ticket);
        Ticket ticket1 = Ticket.builder()
                .title("Login Issue")
                .date(Instant.now())
                .description("Unable to login with correct credentials")
                .priority(Level.HIGH)
                .build();
        ticketRepository.save(ticket1);
        Ticket ticket2 = Ticket.builder()
                .title("Slow Page Load")
                .date(Instant.now())
                .description("Homepage takes too long to load")
                .priority(Level.MEDIUM)
                .build();
        ticketRepository.save(ticket2);
        Ticket ticket3 = Ticket.builder()
                .title("Database Connection Error")
                .date(Instant.now())
                .description("Failed to connect to the database")
                .priority(Level.HIGH)
                .build();
        ticketRepository.save(ticket3);
        Ticket ticket4 = Ticket.builder()
                .title("UI Bug in Dashboard")
                .date(Instant.now())
                .description("Misalignment of buttons on the dashboard")
                .priority(Level.LOW)
                .build();
        ticketRepository.save(ticket4);
        Ticket ticket5 = Ticket.builder()
                .title("Security Vulnerability")
                .date(Instant.now())
                .description("Potential security issue in the authentication flow")
                .priority(Level.HIGH)
                .build();
        ticketRepository.save(ticket5);

        // Create Projects
        Project project1 = new Project(null, "Website Redesign", "Redesign the company website for a modern look and feel.", null, null);
        //project1.setUsers(Set.of(user1, user2, user3));
        projectRepository.save(project1);
        Project project2 = new Project(null, "Mobile App Development", "Develop a new mobile app for the company's e-commerce platform.", null, null);
        //project2.setUsers(Set.of(user2, user4, user5));
        //project2.setTicket(Set.of(ticket1, ticket2));
        projectRepository.save(project2);
    }
}
