package com.moviespedia.movies.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaRequestDTO {
    String mediaType;
    String mediaCategory;
    String page;
}
