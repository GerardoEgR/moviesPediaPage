package com.moviespedia.movies.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "favorites", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Favorites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(nullable = false)
    Integer userId;
    @Column(nullable = false)
    Integer mediaId;
    String mediaType;
    String mediaTitle;
    String mediaPoster;
    @Column(nullable = false, precision = 8, scale = 3)
    BigDecimal mediaRate;
}
