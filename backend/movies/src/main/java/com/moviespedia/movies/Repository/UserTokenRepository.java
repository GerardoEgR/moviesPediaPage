package com.moviespedia.movies.Repository;

import com.moviespedia.movies.Entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Integer> {

    Optional<UserToken> findByUsername(String username);

    @Modifying()
    @Query("update UserToken u set u.username=:username, u.token = :token where u.id = :id")
    void updateUser(@Param(value = "id") Integer id, @Param(value = "username") String username, @Param(value = "token") String token);
}
