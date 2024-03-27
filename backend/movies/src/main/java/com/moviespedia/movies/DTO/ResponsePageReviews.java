package com.moviespedia.movies.DTO;

import com.moviespedia.movies.Entity.Reviews;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePageReviews {

    private Integer page;
    private Long totalSize;
    private Integer totalPages;
    private List<Reviews> reviewsList;
}
