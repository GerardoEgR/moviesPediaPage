package com.moviespedia.movies.Controller;

import com.moviespedia.movies.DTO.MediaRequestDTO;
import com.moviespedia.movies.DTO.SearchRequestDTO;
import com.moviespedia.movies.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/moviesApi")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping(value ="/getMovies", produces = MediaType.APPLICATION_JSON_VALUE)
    public String findAll(@RequestParam String mediaType, @RequestParam String mediaCategory, @RequestParam String page) {
        MediaRequestDTO requestMedia = new MediaRequestDTO(mediaType, mediaCategory, page);
        return movieService.findAll(requestMedia);
    }

    @GetMapping(value ="/genres", produces = MediaType.APPLICATION_JSON_VALUE)
    public String findAllGenres(@RequestParam String mediaType) {
        return movieService.findAllGenres(mediaType);
    }

    @GetMapping(value ="/details/{mediaType}/{mediaId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getDetails(@PathVariable Integer mediaId, @PathVariable String mediaType) {
        return movieService.getDetails(mediaId, mediaType);
    }

    @GetMapping(value ="/videos/{mediaType}/{mediaId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getVideos(@PathVariable Integer mediaId, @PathVariable String mediaType) {
        return movieService.getVideos(mediaId, mediaType);
    }

    @GetMapping(value ="/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public String search(@RequestParam String mediaType, @RequestParam String title, @RequestParam String page) {
        SearchRequestDTO requestSearch = new SearchRequestDTO(mediaType, title, page);
        return movieService.searchByName(requestSearch);
    }
}
