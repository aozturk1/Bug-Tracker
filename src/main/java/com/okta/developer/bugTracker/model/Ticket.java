package com.okta.developer.bugTracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    @Builder.Default
    private Instant date = Instant.now();

    @NonNull
    private String title;
    private String description;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Level priority = Level.LOW;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedUser;
}

