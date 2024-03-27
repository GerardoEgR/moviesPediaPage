package com.moviespedia.movies.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDTO {
    Integer mediaId;
    Integer userId;
    String username;
    String comment;
    String createdAt;
    String mediaType;
    String mediaTitle;
    String mediaPoster;
}
