package com.moviespedia.movies.Controller;

import com.moviespedia.movies.DTO.FavoriteRequestDTO;
import com.moviespedia.movies.DTO.ResponsePage;
import com.moviespedia.movies.Entity.Favorites;
import com.moviespedia.movies.Service.FavoritesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;

    @PostMapping(value = "/addFavorites", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Favorites> addFavorites(@RequestBody FavoriteRequestDTO favoriteRequest) {
        Favorites addedFavorites = favoritesService.addFavorites(favoriteRequest);
        if (addedFavorites != null) {
            return ResponseEntity.ok(addedFavorites);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/deleteFavoriteById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteFavoriteById(@PathVariable Integer id) {
        try {
        favoritesService.deleteFavoriteById(id);
        return ResponseEntity.ok("Item deleted successfully from favorites");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/getAllFavorites", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllFavorites(@RequestParam Integer userId,
                                             @RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(required = false) Integer size) {
        Page<Favorites> favorites = favoritesService.getAllFavoritesByUserId(userId, page, size);
        if (favorites.isEmpty()) {
            String message = "The user has no items added to favorites.";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            ResponsePage response = new ResponsePage();
            response.setPage(favorites.getPageable().getPageNumber());
            response.setTotalSize(favorites.getTotalElements());
            response.setTotalPages(favorites.getTotalPages());
            response.setFavoritesList(favorites.getContent());

            return ResponseEntity.ok(response);
        }
    }
}
