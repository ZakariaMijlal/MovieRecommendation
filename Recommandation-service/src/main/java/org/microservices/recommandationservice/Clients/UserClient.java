package org.microservices.recommandationservice.Clients;

import org.microservices.recommandationservice.DTO.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserClient {
    // Attention: ça doit correspondre exactement au JSON renvoyé par User-Service
    @GetMapping("/users/{id}")
    UserDTO getUser(@PathVariable("id") Long id);
}
