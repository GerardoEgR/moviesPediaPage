package com.moviespedia.movies.Service;

import com.moviespedia.movies.DTO.UserDTO;
import com.moviespedia.movies.DTO.UserRequest;
import com.moviespedia.movies.DTO.UserResponse;

public interface UserService {

    public UserDTO getUserById(Integer id);

    public UserResponse updateUser(UserRequest userRequest);

}
