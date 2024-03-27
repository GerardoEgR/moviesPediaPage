package com.moviespedia.movies.Controller;

import com.moviespedia.movies.DTO.ResponsePageReviews;
import com.moviespedia.movies.DTO.ReviewRequestDTO;
import com.moviespedia.movies.Entity.Reviews;
import com.moviespedia.movies.Service.ReviewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewsController {

    private final ReviewsService reviewsService;

    @PostMapping(value = "/addReviews", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addReviews(@RequestBody ReviewRequestDTO reviewRequest) {
        String response = reviewsService.addReviews(reviewRequest);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/deleteReviewById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteReviewById(@PathVariable Integer id) {
        try {
            reviewsService.deleteReviewById(id);
            return ResponseEntity.ok("Item deleted successfully from reviews");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/getAllReviewsByUserId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllReviewsByUserId(@RequestParam Integer userId, @RequestParam Integer page, @RequestParam Integer size) {
        Page<Reviews> reviews = reviewsService.getAllReviewsByUserId(userId,  page, size);
        if (reviews.isEmpty()) {
            String message = "The user has no items added to reviews.";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            ResponsePageReviews response = new ResponsePageReviews();
            response.setPage(reviews.getPageable().getPageNumber());
            response.setTotalSize(reviews.getTotalElements());
            response.setTotalPages(reviews.getTotalPages());
            response.setReviewsList(reviews.getContent());

            return ResponseEntity.ok(response);
        }
    }

    @GetMapping(value = "/getAllReviews", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllReviews() {
        List<Reviews> reviews = reviewsService.getAllReviews();
        if (reviews.isEmpty()) {
            String message = "The user has no items added to reviews.";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.ok(reviews);
        }
    }
}
