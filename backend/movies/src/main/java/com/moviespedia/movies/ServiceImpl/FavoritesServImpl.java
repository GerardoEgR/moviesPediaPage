package com.moviespedia.movies.ServiceImpl;

import com.moviespedia.movies.DTO.FavoriteRequestDTO;
import com.moviespedia.movies.Entity.Favorites;
import com.moviespedia.movies.Repository.FavoritesRepository;
import com.moviespedia.movies.Service.FavoritesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoritesServImpl implements FavoritesService {

    private final FavoritesRepository favoritesRepository;

    @Override
    public Favorites addFavorites(FavoriteRequestDTO favoriteRequest) {
        Favorites favorites = Favorites.builder()
                .mediaId(favoriteRequest.getMediaId())
                .userId(favoriteRequest.getUserId())
                .mediaType(favoriteRequest.getMediaType())
                .mediaTitle(favoriteRequest.getMediaTitle())
                .mediaPoster(favoriteRequest.getMediaPoster())
                .mediaRate(favoriteRequest.getMediaRate())
                .build();

        favoritesRepository.save(favorites);
        return favorites;
    }

    @Override
    public void deleteFavoriteById(Integer id) { favoritesRepository.deleteById(id); }

    @Override
    public Page<Favorites> getAllFavoritesByUserId(Integer userId, Integer page, Integer size) {
        return favoritesRepository.findAllByUserId(userId, PageRequest.of(page - 1, size));
    }
}
