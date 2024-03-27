package com.moviespedia.movies.Repository;

import com.moviespedia.movies.Entity.Reviews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer> {

    Page<Reviews> findAllByUserId(Integer userId, Pageable pageable);
}
