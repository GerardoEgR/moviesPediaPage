package com.moviespedia.movies.Service;

import com.moviespedia.movies.DTO.ReviewRequestDTO;
import com.moviespedia.movies.Entity.Reviews;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ReviewsService {

    public String addReviews(ReviewRequestDTO reviewRequest);

    public void deleteReviewById(Integer id);

    public Page<Reviews> getAllReviewsByUserId(Integer userId, Integer page, Integer size);

    public List<Reviews> getAllReviews();
}
