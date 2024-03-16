package com.CGI.backend.controllers;

import com.CGI.backend.DTO.MovieDetailsResponse;
import com.CGI.backend.DTO.MoviePageResponse;
import com.CGI.backend.models.Movie;
import com.CGI.backend.services.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/movies")
@AllArgsConstructor
@CrossOrigin
public class MovieController {
    private final MovieService movieService;

    // Endpoint to get movie details and non-available seats by its ID
    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailsResponse> getMovieDetails(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        Set<Integer> nonAvailableSeats = movieService.getNonAvailableSeatsForMovie(id);
        MovieDetailsResponse response = new MovieDetailsResponse(movie, nonAvailableSeats);
        return ResponseEntity.ok(response);
    }

     // Endpoint to get all movies with pagination and search filters
    @GetMapping
    public ResponseEntity<MoviePageResponse> getAllMovies(
        Pageable pageable,
        @RequestParam(required = false) String ageRating,
        @RequestParam(required = false) String startTime,
        @RequestParam(required = false) String language
    ) {
        // Call service method with filters
        Page<Movie> movies = movieService.getAllMovies(pageable, ageRating, startTime, language);
        MoviePageResponse response = new MoviePageResponse(movies);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get recommended movies for user based on purchase history
    @GetMapping("/recommended")
    public ResponseEntity<MoviePageResponse> getRecommendedMovies(Pageable pageable){
        Page<Movie> movies = movieService.getRecommendedMovies(pageable);
        MoviePageResponse response = new MoviePageResponse(movies);
        return ResponseEntity.ok(response);
    }
}
