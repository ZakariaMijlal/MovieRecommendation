package org.microservices.recommandationservice.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "movie-service", url = "http://localhost:8082")
public interface MovieClient {
    // On appelle ton endpoint de recherche OMDb
    @GetMapping("/movies/search")
    Object searchMovies(@RequestParam("query") String query);
}
