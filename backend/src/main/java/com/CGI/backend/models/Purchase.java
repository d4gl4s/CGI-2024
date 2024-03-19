package com.CGI.backend.models;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @ToString
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // this is only to differentiate between purchases the user has made and seats that were booked by others.

    @ElementCollection
    private Set<Integer> seatNumbers;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;

    public Purchase(Set<Integer> seatNumbers, Movie movie, Long userId) {
        this.userId = userId;
        this.seatNumbers = seatNumbers;
        this.movie = movie;
        this.purchaseDate = new Date(); // Assign current time
    }
}