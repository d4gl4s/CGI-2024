package com.CGI.backend.DTO;

import com.CGI.backend.models.Movie;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequestDTO {
    private Set<Integer> seatNumbers;
    private Movie movie; // Assuming movieId is used to identify the movie
}
