package org.microservices.recommandationservice.Controller;

import org.microservices.recommandationservice.Clients.MovieClient;
import org.microservices.recommandationservice.Clients.UserClient;
import org.microservices.recommandationservice.DTO.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RecommendationController {

    @Autowired
    private UserClient userClient;

    @Autowired
    private MovieClient movieClient;

    @GetMapping("/recommend/{userId}")
    @CrossOrigin(origins = "*")
    public Map<String, Object> recommendMovies(@PathVariable Long userId) {
        Map<String, Object> result = new HashMap<>();

        // 1. Récupérer l'utilisateur (via Feign -> Port 8081)
        UserDTO user = userClient.getUser(userId);
        result.put("user", user);

        // 2. Récupérer des films pour chaque genre favori (via Feign -> Port 8082)
        List<Object> recommendations = new ArrayList<>();

        if (user.getFavorites() != null) {
            for (String genre : user.getFavorites()) {
                // On cherche des films pour ce genre/mot-clé
                Object movies = movieClient.searchMovies(genre);
                recommendations.add(movies);
            }
        }

        result.put("recommendations", recommendations);
        return result;
    }
}
