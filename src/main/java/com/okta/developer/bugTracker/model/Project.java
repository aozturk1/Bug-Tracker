package com.okta.developer.bugTracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;
    private String description;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Ticket> ticket;

    // Project has many users, and users have many projects
    @ManyToMany
    @JoinTable(
            name = "project_user",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;
}
