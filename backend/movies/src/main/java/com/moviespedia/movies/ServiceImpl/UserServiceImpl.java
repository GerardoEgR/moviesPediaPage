package com.moviespedia.movies.ServiceImpl;

import com.moviespedia.movies.DTO.UserDTO;
import com.moviespedia.movies.DTO.UserRequest;
import com.moviespedia.movies.DTO.UserResponse;
import com.moviespedia.movies.Entity.User;
import com.moviespedia.movies.Entity.UserToken;
import com.moviespedia.movies.Repository.UserRepository;
import com.moviespedia.movies.Repository.UserTokenRepository;
import com.moviespedia.movies.Service.UserService;
import com.moviespedia.movies.Utils.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserTokenRepository userTokenRepository;

    @Override
    public UserDTO getUserById(Integer id) {

        User user = userRepository.findById(id).orElse(null);
        UserToken userToken = userTokenRepository.findByUsername(user.getUsername()).orElse(null);

        if (user != null) {
            return UserDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .token(userToken.getToken())
                    .build();
        }
        return null;
    }

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        UserToken userToken = userTokenRepository.findById(userRequest.getId()).orElse(null);

        User user = User.builder()
                .id(userRequest.getId())
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .role(Role.USER)
                .build();

        if(!userToken.getUsername().equals(userRequest.getUsername())) {
            UserToken newUserToken = UserToken.builder()
                    .id(userRequest.getId())
                    .username(userRequest.getUsername())
                    .token(userToken.getToken())
                    .build();

            userTokenRepository.updateUser(newUserToken.getId(), newUserToken.getUsername(), newUserToken.getToken());
        }

        userRepository.updateUser(user.getId(), user.getUsername(), user.getFirstName(), user.getPassword(), user.getLastName(), user.getEmail());

        return new UserResponse("Password updated successfully.");
    }
}
