package org.microservices.movieservice.Controller;

import org.microservices.movieservice.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public String search(@RequestParam String query) {
        return movieService.searchMovies(query);
    }
}
