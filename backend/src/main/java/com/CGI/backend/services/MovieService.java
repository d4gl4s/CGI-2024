package com.CGI.backend.services;

import com.CGI.backend.enums.AgeRating;
import com.CGI.backend.exceptions.errors.MovieNotFoundException;
import com.CGI.backend.models.Movie;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.MovieRepository;
import com.CGI.backend.repository.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@AllArgsConstructor
public class MovieService {
        private final MovieRepository movieRepository;
        private final PurchaseRepository purchaseRepository;


        public Movie getMovieById(Long id) {
                Movie movie = movieRepository.findById(id).orElse(null);
                if (movie == null)
                        throw new MovieNotFoundException("Movie with id " + id + " not found");
                return movie;
        }

        // Method to get all movies with pagination
        public Page<Movie> getAllMovies(Pageable pageable, String ageRating, String startTime, String language) {
                Specification<Movie> spec = Specification.where(null);

                if (ageRating != null) // Filter by age rating
                        spec = spec.and((root, query, builder) -> builder.equal(root.get("ageRating"), AgeRating.valueOf(ageRating)));

                if (startTime != null) {
                        LocalTime parsedStartTime = LocalTime.parse(startTime);
                        spec = spec.and((root, query, builder) -> builder.greaterThanOrEqualTo(root.get("startTime"), parsedStartTime));
                }

                if (language != null)  // Filter by language
                        spec = spec.and((root, query, builder) -> builder.equal(root.get("language"), language));

                // Apply specifications to repository query
                return movieRepository.findAll(spec, pageable);
        }

        public Set<Integer> getNonAvailableSeatsForMovie(Long movieId) {
                return purchaseRepository.findSeatNumbersByMovieId(movieId);
        }
}
