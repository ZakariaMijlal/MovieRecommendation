package org.microservices.movieservice.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MovieService {

    private final WebClient webClient = WebClient.builder().build();

    @Value("${omdb.api.key}")
    private String apiKey;

    @Value("${omdb.api.url}")
    private String apiUrl;

    public String searchMovies(String query) {
        // Construction de l'URL OMDb : http://www.omdbapi.com/?apikey=XYZ&s=Batman
        String url = apiUrl + "/?apikey=" + apiKey + "&s=" + query;

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class) // On récupère le JSON brut
                .block();
    }
}