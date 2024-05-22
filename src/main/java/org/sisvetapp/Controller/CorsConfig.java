package org.sisvetapp.Controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
// Defina a origem permitida para o cliente ReactJS
                .allowedMethods("GET", "POST", "PUT", "DELETE")
// Defina os métodos HTTP permitidos
                .allowedHeaders("*")
// Defina os cabeçalhos permitidos
                .allowCredentials(true);
// Permita o uso de cookies de autenticação (se aplicável)
    }
}
