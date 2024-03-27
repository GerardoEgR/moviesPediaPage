package com.moviespedia.movies.Repository;

import com.moviespedia.movies.Entity.Favorites;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {

    Page<Favorites> findAllByUserId(Integer userId, Pageable pageable);
}
