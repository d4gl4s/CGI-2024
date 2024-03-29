package com.CGI.backend.services;

import com.CGI.backend.models.Movie;
import com.CGI.backend.models.Purchase;
import com.CGI.backend.repository.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Date;
import java.util.Set;

@Service
@AllArgsConstructor
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    public void addPurchase(Purchase purchase) {
        // Check for null values
        if (purchase.getUserId() == null || purchase.getSeatNumbers() == null || purchase.getMovie() == null)
            throw new IllegalArgumentException("UserId, seatNumbers, and movie must be provided.");

        // check if the seats provided are available,
        boolean seatsAvailable = checkSeatAvailability(purchase);
        if(!seatsAvailable) throw new IllegalArgumentException("The provided seats are not available");

        // check if the movie provided start time is not in the past
        LocalTime currentTime = LocalTime.now();
        LocalTime startTime = purchase.getMovie().getStartTime();
        if(startTime.isBefore(currentTime)) throw new IllegalArgumentException("The movie has already started");

        purchaseRepository.save(purchase);
    }


    private boolean checkSeatAvailability(Purchase purchase) {
        return purchaseRepository.countByMovieAndSeatNumbersIn(purchase.getMovie(), purchase.getSeatNumbers()) == 0;
    }
}
