package com.CGI.backend.services;

import com.CGI.backend.enums.AgeRating;
import com.CGI.backend.exceptions.MovieNotFoundException;
import com.CGI.backend.models.Movie;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.MovieRepository;
import com.CGI.backend.repository.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class MovieService {
        private final MovieRepository movieRepository;
        private final PurchaseRepository purchaseRepository;


        public Movie getMovieById(Long id) {
                Movie movie = movieRepository.findById(id).orElse(null);
                if (movie == null) throw new MovieNotFoundException("Movie with id " + id + " not found");
                return movie;
        }

        // Method to get all movies with pagination
        public Page<Movie> getAllMovies(Pageable pageable, String ageRating,String genre, String startTime, String language) {
                Specification<Movie> spec = Specification.where(null);

                if (ageRating != null) // Filter by age rating
                        spec = spec.and((root, query, builder) -> builder.equal(root.get("ageRating"), AgeRating.valueOf(ageRating)));
                if (genre != null) // Filter by genre
                        spec = spec.and((root, query, builder) -> builder.equal(root.get("genre"), genre));
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
        // Method to get recommended movies based on user's purchase history
        public Page<Movie> getRecommendedMovies(Pageable pageable) {
                Long userId = 2L;
                List<Purchase> purchases = purchaseRepository.findByUserId(userId); // Retrieve all user purchases

                // If user has not made any purchases, return all movies.
                if(purchases.isEmpty()) return getAllMovies(pageable, null, null, null, null);

                // Count the occurrences of each genre in the purchases
                Map<String, Long> genreCounts = purchases.stream()
                        .map(purchase -> purchase.getMovie().getGenre())
                        .collect(Collectors.groupingBy(genre -> genre, Collectors.counting()));

                // Sort genres by their occurrence count in descending order
                List<String> sortedGenres = genreCounts.entrySet().stream()
                        .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                        .map(Map.Entry::getKey)
                        .toList();

                // Query movies based on preferred genres and weights
                List<Movie> recommendedMovies = new ArrayList<>();
                for(String genre: sortedGenres){
                        List<Movie> genreMovies = movieRepository.findByGenreAndNotPurchasedByUser(genre, userId );
                        // Sort movies based on imdb rating
                        genreMovies.sort(Comparator.comparingDouble(Movie::getImdbScore).reversed());
                        recommendedMovies.addAll(genreMovies);
                }

                // Paginate recommended movies
                int start = Math.toIntExact(pageable.getOffset());
                int end = Math.min((start + pageable.getPageSize()), recommendedMovies.size());
                if(start > end) throw new IllegalArgumentException("Incorrect page number");
                return new PageImpl<>(recommendedMovies.subList(start, end), pageable, recommendedMovies.size());
        }
}
