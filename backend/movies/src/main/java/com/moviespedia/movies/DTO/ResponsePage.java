package com.moviespedia.movies.DTO;

import com.moviespedia.movies.Entity.Favorites;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePage {

    private Integer page;
    private Long totalSize;
    private Integer totalPages;
    private List<Favorites> favoritesList;
}
