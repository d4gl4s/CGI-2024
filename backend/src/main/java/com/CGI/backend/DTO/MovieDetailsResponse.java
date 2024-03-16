package com.CGI.backend.DTO;

import com.CGI.backend.models.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Set;

@Data
@AllArgsConstructor
public class MovieDetailsResponse {
    private Movie movie;
    private Set<Integer> nonAvailableSeats;

}
