package com.CGI.backend.repository;

import com.CGI.backend.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    @Query("SELECT p.seatNumbers FROM Purchase p WHERE p.movie.id = :movieId")
    Set<Integer> findSeatNumbersByMovieId(@Param("movieId") Long movieId);
}
