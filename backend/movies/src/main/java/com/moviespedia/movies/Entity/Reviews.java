package com.moviespedia.movies.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(nullable = false)
    Integer mediaId;
    Integer userId;
    @Column(nullable = false)
    String username;
    String comment;
    String createdAt;
    String mediaType;
    String mediaTitle;
    String mediaPoster;
}
