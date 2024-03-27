package com.moviespedia.movies.Service;

import com.moviespedia.movies.Entity.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String getToken(User user);

    String getUsernameFromToken(String token);

    boolean isTokenValid(String token, UserDetails userDetails);
}
