package com.moviespedia.movies.Service;

import com.moviespedia.movies.DTO.MediaRequestDTO;
import com.moviespedia.movies.DTO.SearchRequestDTO;
import com.moviespedia.movies.Security.RegisterRequest;

public interface MovieService {

    public String findAll(MediaRequestDTO requestMedia);

    public String findAllGenres(String mediaType);

    public String getDetails(Integer mediaId, String mediaType);

    public String getVideos(Integer mediaId, String mediaType);

    public String searchByName(SearchRequestDTO requestSearch);

}
