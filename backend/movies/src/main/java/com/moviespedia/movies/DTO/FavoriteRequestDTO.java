package com.moviespedia.movies.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequestDTO {
    Integer mediaId;
    Integer userId;
    String mediaType;
    String mediaTitle;
    String mediaPoster;
    BigDecimal mediaRate;
}
