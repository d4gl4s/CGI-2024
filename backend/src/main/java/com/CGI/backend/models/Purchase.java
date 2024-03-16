package com.CGI.backend.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @ToString
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Integer> seatNumbers;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;

    public Purchase(List<Integer> seatNumbers, Movie movie) {
        this.seatNumbers = seatNumbers;
        this.movie = movie;
        this.purchaseDate = new Date(); // Assign current time
    }
}