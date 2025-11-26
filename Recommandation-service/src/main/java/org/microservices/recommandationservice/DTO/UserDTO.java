package org.microservices.recommandationservice.DTO;



import java.util.List;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private List<String> favorites; // Assure-toi que c'est bien écrit "favorites"

    // --- Ajoute ces blocs manuellement ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // C'est LUI qui manque au compilateur
    public List<String> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<String> favorites) {
        this.favorites = favorites;
    }
}