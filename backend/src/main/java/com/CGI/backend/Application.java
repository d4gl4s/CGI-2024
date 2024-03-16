package com.CGI.backend;

import com.CGI.backend.enums.AgeRating;
import com.CGI.backend.models.Movie;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.MovieRepository;
import com.CGI.backend.repository.PurchaseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	CommandLineRunner run(MovieRepository movieRepository, PurchaseRepository purchaseRepository){
		return args -> {
			Movie movie = new Movie("Movie 1", "Description 1", "Action", AgeRating.R, LocalTime.now(), 120, "English", "https://images.english.elpais.com/resizer/SJcC_wP0VXNcCcwJwHOLThym-uI=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/5XMXTR36RRDZHJY7VKLKKEMDQA.jpg" );
			Movie movie2 = new Movie("Movie 2", "Description 2", "Comedy", AgeRating.R, LocalTime.now(), 120, "English", "https://images.english.elpais.com/resizer/SJcC_wP0VXNcCcwJwHOLThym-uI=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/5XMXTR36RRDZHJY7VKLKKEMDQA.jpg" );
			movieRepository.save(movie);
			movieRepository.save(movie2);
			Purchase purchase = new Purchase(List.of(1, 2, 3), movie);
			purchaseRepository.save(purchase);
		};
	}

}
