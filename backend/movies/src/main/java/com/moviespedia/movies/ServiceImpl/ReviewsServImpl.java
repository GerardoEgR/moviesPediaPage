package com.moviespedia.movies.ServiceImpl;

import com.moviespedia.movies.DTO.ReviewRequestDTO;
import com.moviespedia.movies.Entity.Reviews;
import com.moviespedia.movies.Repository.ReviewsRepository;
import com.moviespedia.movies.Service.ReviewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewsServImpl implements ReviewsService {

    private final ReviewsRepository reviewsRepository;

    @Override
    public String addReviews(ReviewRequestDTO reviewRequest) {

        Reviews reviews = Reviews.builder()
                .mediaId(reviewRequest.getMediaId())
                .userId(reviewRequest.getUserId())
                .username(reviewRequest.getUsername())
                .comment(reviewRequest.getComment())
                .createdAt(reviewRequest.getCreatedAt())
                .mediaType(reviewRequest.getMediaType())
                .mediaTitle(reviewRequest.getMediaTitle())
                .mediaPoster(reviewRequest.getMediaPoster())
                .build();

        reviewsRepository.save(reviews);
        return "Review added successfully";
    }

    @Override
    public void deleteReviewById(Integer id) {
        reviewsRepository.deleteById(id);
    }

    @Override
    public Page<Reviews> getAllReviewsByUserId(Integer userId, Integer page, Integer size) {
        return reviewsRepository.findAllByUserId(userId, PageRequest.of(page - 1, size));
    }

    @Override
    public List<Reviews> getAllReviews() {
        return reviewsRepository.findAll();
    }
}
