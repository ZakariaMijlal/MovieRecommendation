package org.microservices.userservice.repository;

import org.microservices.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource
@CrossOrigin(origins = "*") // Important pour que React puisse appeler
public interface UserRepository extends JpaRepository<User, Long> {

    // Cela expose automatiquement : /users/search/findByEmail?email=...
    User findByEmail(@Param("email") String email);
}