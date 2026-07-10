package com.portfolio_backend.configuration;

import com.portfolio_backend.models.User;
import com.portfolio_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        User admin = userRepository.findByUsername("admin").orElse(null);
        if (admin == null) {
            admin = new User();
            admin.setUsername("admin");
        }
        // Encrypt and synchronize password to "Sanchez"
        admin.setPassword(passwordEncoder.encode("Sanchez"));
        admin.setPasswordResetRequired(true);
        
        userRepository.save(admin);
        System.out.println("Admin user password synchronized: admin / Sanchez");
    }
}
