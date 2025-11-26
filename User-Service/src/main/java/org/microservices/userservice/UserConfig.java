package org.microservices.userservice;

import org.microservices.userservice.entity.User;
import org.microservices.userservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner start(UserRepository userRepository) {
        return args -> {
            // VERIFICATION : On n'ajoute les données que si la base est vide !
            // C'est indispensable avec MySQL pour éviter les erreurs "Duplicate entry" au redémarrage.
            if (userRepository.count() == 0) {

                // Utilisateur 1
                User u1 = new User(
                        null,
                        "Mohammed",
                        "mohammed@gmail.com",
                        "1234", // Mot de passe
                        List.of("Inception", "Interstellar", "Batman") // Ses gouts
                );
                userRepository.save(u1);

                // Utilisateur 2
                User u2 = new User(
                        null,
                        "Sara",
                        "sara@gmail.com",
                        "1234",
                        List.of("Titanic", "Notebook", "Frozen")
                );
                userRepository.save(u2);

                System.out.println("✅ Base MySQL vide : Utilisateurs de test ajoutés avec succès !");
            } else {
                System.out.println("ℹ️ La base MySQL contient déjà des données. Aucune insertion effectuée.");
            }
        };
    }
}