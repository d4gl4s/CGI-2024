package com.CGI.backend.DTO;

import com.CGI.backend.models.Movie;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequestDTO {
    private List<Integer> seatNumbers;
    private Movie movie; // Assuming movieId is used to identify the movie
}
