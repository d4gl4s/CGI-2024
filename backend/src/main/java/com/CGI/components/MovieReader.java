package com.CGI.components;

import com.CGI.backend.enums.AgeRating;
import com.CGI.backend.models.Movie;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class MovieReader {
    public static List<Movie> readMoviesFromCSV() {
        List<Movie> movies = new ArrayList<>();

         try (BufferedReader br = new BufferedReader(new InputStreamReader(Objects.requireNonNull(MovieReader.class.getClassLoader().getResourceAsStream("data/imdb_data.csv"))))) {
            String line;
            br.readLine(); // Skip header row
            while ((line = br.readLine()) != null) {
                String[] row = line.split(",");
                String directorName = row[0];
                int duration = Integer.parseInt(row[1]);
                String[] genres = row[2].split("\\|");
                String genre = genres[0]; // Assuming you want only the first genre
                String title = row[3];
                String language = row[4];
                AgeRating contentRating;
                try{
                   contentRating = AgeRating.valueOf(row[5].toUpperCase());
                }catch (IllegalArgumentException ex){
                    throw new IllegalArgumentException("Could not convert content rating " + row[5] + " to enum");
                }

                double imdbScore = Double.parseDouble(row[6]);
                String posterLink = row[7];

                Movie movie = new Movie(title, genre,directorName, contentRating, generateRandomStartTime(), duration, language, imdbScore, posterLink);
                movies.add(movie);
            }
        } catch (IOException e) {
           throw new RuntimeException("Error reading movies from CSV file");
        }

        return movies;
    }

    private static LocalTime generateRandomStartTime() {
        // Generate a random hour between 10 AM and 11 PM (inclusive)
        int hour = ThreadLocalRandom.current().nextInt(10, 24);
        // Generate a random minute (00, 15, 30, or 45)
        int minute = ThreadLocalRandom.current().nextInt(0, 4) * 15;
        return LocalTime.of(hour, minute);
    }
}


