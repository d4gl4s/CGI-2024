package com.CGI.backend.DTO;

import java.util.List;

import com.CGI.backend.models.Movie;
import lombok.*;
import org.springframework.data.domain.Page;

@Data
@AllArgsConstructor
public class MoviePageResponse {
    private List<Movie> movies;
    private int totalPages;
    private long totalElements;

    public MoviePageResponse(Page<Movie> movies){
        this.movies = movies.getContent();
        this.totalPages = movies.getTotalPages();
        this.totalElements = movies.getTotalElements();
    }
}
