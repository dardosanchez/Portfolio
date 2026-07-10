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
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            // Encrypt default password "admin123"
            admin.setPassword(passwordEncoder.encode("admin123"));
            
            userRepository.save(admin);
            System.out.println("Default admin user created: admin / admin123");
        }
    }
}
