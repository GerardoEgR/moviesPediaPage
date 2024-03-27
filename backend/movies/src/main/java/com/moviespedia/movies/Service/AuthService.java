package com.moviespedia.movies.Service;

import com.moviespedia.movies.Security.AuthResponse;
import com.moviespedia.movies.Security.LoginRequest;
import com.moviespedia.movies.Security.RegisterRequest;

public interface AuthService {
    public AuthResponse login(LoginRequest request);

    public AuthResponse register(RegisterRequest request);
}
