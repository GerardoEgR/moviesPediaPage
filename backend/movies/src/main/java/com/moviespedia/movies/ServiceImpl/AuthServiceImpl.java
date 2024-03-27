package com.moviespedia.movies.ServiceImpl;

import com.moviespedia.movies.Entity.User;
import com.moviespedia.movies.Entity.UserToken;
import com.moviespedia.movies.Repository.UserRepository;
import com.moviespedia.movies.Repository.UserTokenRepository;
import com.moviespedia.movies.Security.AuthResponse;
import com.moviespedia.movies.Security.LoginRequest;
import com.moviespedia.movies.Security.RegisterRequest;
import com.moviespedia.movies.Service.AuthService;
import com.moviespedia.movies.Service.JwtService;
import com.moviespedia.movies.Utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserTokenRepository userTokenRepository;

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        User userSaved = userRepository.findByUsername(request.getUsername()).orElseThrow();

        String token = jwtService.getToken(userSaved);

        UserToken tokenLog = UserToken.builder()
                .username(request.getUsername())
                .token(token)
                .build();

        userTokenRepository.save(tokenLog);

        return AuthResponse.builder()
                .token(token)
                .build();
    }
}
