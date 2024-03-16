package com.CGI.backend.models;

import com.CGI.backend.enums.AgeRating;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter @Setter @NoArgsConstructor @ToString
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String genre;

    @Enumerated(EnumType.STRING)
    private AgeRating ageRating;
    private LocalTime startTime;
    private int duration; // in minutes
    private String language;
    private String poster;

    // Constructor without the ID parameter
    public Movie(String title, String description, String genre, AgeRating ageRating, LocalTime startTime, int duration, String language, String poster) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.ageRating = ageRating;
        this.startTime = startTime;
        this.duration = duration;
        this.language = language;
        this.poster = poster;
    }

}