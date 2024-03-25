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
    private String genre;
    private String directorName;
    @Enumerated(EnumType.STRING)
    private AgeRating ageRating;
    private LocalTime startTime;
    private int duration; // in minutes
    private String language;
    private double imdbScore;
    private String poster;

    public Movie(String title,  String genre, String directorName, AgeRating ageRating, LocalTime startTime, int duration, String language, double imdbScore, String poster) {
        this.title = title;
        this.genre = genre;
        this.directorName = directorName;
        this.ageRating = ageRating;
        this.startTime = startTime;
        this.duration = duration;
        this.language = language;
        this.imdbScore = imdbScore;
        this.poster = poster;
    }
}