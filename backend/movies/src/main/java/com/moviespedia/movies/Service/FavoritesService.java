package com.moviespedia.movies.Service;

import com.moviespedia.movies.DTO.FavoriteRequestDTO;
import com.moviespedia.movies.Entity.Favorites;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FavoritesService {

    public Favorites addFavorites(FavoriteRequestDTO favoriteRequest);

    public void deleteFavoriteById(Integer id);

    public Page<Favorites> getAllFavoritesByUserId(Integer userId, Integer page, Integer size);

}
