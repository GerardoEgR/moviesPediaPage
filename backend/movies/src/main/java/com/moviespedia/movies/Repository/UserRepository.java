package com.moviespedia.movies.Repository;

import com.moviespedia.movies.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    @Modifying()
    @Query("update User u set u.username=:username, u.firstName = :firstName, u.password = :password, u.lastName = :lastName, u.email = :email where u.id = :id")
    void updateUser(@Param(value = "id") Integer id, @Param(value = "username") String username, @Param(value = "firstName") String firstName, @Param(value = "password") String password, @Param(value = "lastName") String lastName, @Param(value = "email") String email);
}
