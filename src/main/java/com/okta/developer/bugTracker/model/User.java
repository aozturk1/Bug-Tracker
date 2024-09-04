package com.okta.developer.bugTracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;

    //@Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.User;

    @OneToMany(mappedBy = "assignedUser", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Ticket> ticket;

    @ManyToMany(mappedBy = "users")
    private Set<Project> projects;
}
