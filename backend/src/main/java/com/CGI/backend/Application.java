package com.CGI.backend;

import com.CGI.backend.enums.AgeRating;
import com.CGI.backend.models.Movie;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.MovieRepository;
import com.CGI.backend.repository.PurchaseRepository;
import com.CGI.components.MovieReader;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalTime;
import java.util.*;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	CommandLineRunner run(MovieRepository movieRepository, PurchaseRepository purchaseRepository){
		return args -> {
			List<Movie> movies = MovieReader.readMoviesFromCSV(); // Read in movie metadata from CSV file
			movieRepository.saveAll(movies);
			for (Movie movie : movies) {
				Purchase purchase = generateRandomTakenSeats(movie);
				purchaseRepository.save(purchase);
			}
		};
	}

	public static Purchase generateRandomTakenSeats(Movie movie){
		Random random = new Random();
		int minCount = 10; // Minimum count of random seats
		int maxCount = 25; // Maximum count of random seats
		int minRange = 1;  // Minimum seat number
		int maxRange = 48; // Maximum seat number

		// Generate a random count of seats between minCount and maxCount
		int count = random.nextInt(maxCount - minCount + 1) + minCount;
		Set<Integer> takenSeats = new HashSet<>();// Create a Set to store unique random seat numbers

		// Generate unique random seats and add them to the Set
		while (takenSeats.size() < count) {
			int randomNumber = random.nextInt(maxRange - minRange + 1) + minRange;
			takenSeats.add(randomNumber);
		}
		return new Purchase(takenSeats, movie, 1L);
	}

}
