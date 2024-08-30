package com.okta.developer.bugTracker.web;

import com.okta.developer.bugTracker.model.Project;
import com.okta.developer.bugTracker.model.ProjectRepository;
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
public class ProjectController {
    private final Logger log = LoggerFactory.getLogger(ProjectController.class);
    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping("/projects")
    public Collection<Project> tickets() {
        return projectRepository.findAll();
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/project/{name}")
    public ResponseEntity<?> getProjectByName(@PathVariable String name) {
        Optional<Project> project = Optional.ofNullable(projectRepository.findByName(name));
        return project.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/project")
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) throws URISyntaxException{
        log.info("Request to create project: {}", project);
        Project result = projectRepository.save(project);
        return ResponseEntity.created(new URI("/api/project/" + result.getId()))
                .body(result);
    }

    @PutMapping("/project/{id}")
    public ResponseEntity<Project> updateProject(@Valid @RequestBody Project project) {
        log.info("Request to update project: {}", project);
        Project result = projectRepository.save(project);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        log.info("Request to delete project: {}", id);
        projectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
