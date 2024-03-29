package com.CGI.backend.repository;

import com.CGI.backend.models.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long>, JpaSpecificationExecutor<Movie> {
    @Query("SELECT m FROM Movie m WHERE m.genre = :genre AND m.id NOT IN " +
            "(SELECT p.movie.id FROM Purchase p WHERE p.userId = :userId)")
    List<Movie> findByGenreAndNotPurchasedByUser(@Param("genre") String genre, @Param("userId") Long userId);



}
