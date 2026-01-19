package com.portfolio_backend.services;

import com.portfolio_backend.models.Profile;
import com.portfolio_backend.models.dto.ProfileDTO;
import com.portfolio_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
public class ProfileServices implements IProfileService {

    @Autowired
    private ProfileRepository repoProfile;

    @Autowired
    private FileServices fileServices; // Ahora este servicio devuelve String (la URL)

    @Override
    public Profile guardarPerfil(ProfileDTO profileDTO) throws Exception {
        Profile perfil = new Profile();

        // 1. Mapeamos los datos de texto
        perfil.setName(profileDTO.getName());
        perfil.setEmail(profileDTO.getEmail());
        perfil.setCargo(profileDTO.getCargo());
        perfil.setGithub(profileDTO.getGithub());
        perfil.setLinkedin(profileDTO.getLinkedin());

        // 2. Subimos las imágenes SOLO si vienen en el DTO
        if (isValidFile(profileDTO.getImagen())) {
            String urlImagen = fileServices.save(profileDTO.getImagen());
            perfil.setImagen(urlImagen);
        }

        if (isValidFile(profileDTO.getImageAbout())) {
            String urlAbout = fileServices.save(profileDTO.getImageAbout());
            perfil.setImageAbout(urlAbout);
        }

        if (isValidFile(profileDTO.getCurriculum())) {
            String urlCv = fileServices.save(profileDTO.getCurriculum());
            perfil.setCurriculum(urlCv);
        }

        return repoProfile.save(perfil);
    }

    @Override
    public Profile getProfile(Long id) {
        return repoProfile.findById(id).orElse(null);
    }

    @Override
    public List<Profile> getProfiles() {
        return repoProfile.findAll();
    }

    @Override
    public Profile editProfile(Long id, ProfileDTO profileDTO) throws Exception {
        // Buscamos el perfil existente
        Profile perfil = this.getProfile(id);

        // Si no existe, podrías lanzar una excepción, pero por ahora lo dejamos como estaba
        if (perfil == null) {
            return null;
        }

        // 1. Actualizamos texto
        perfil.setName(profileDTO.getName());
        perfil.setCargo(profileDTO.getCargo());
        perfil.setEmail(profileDTO.getEmail());
        perfil.setGithub(profileDTO.getGithub());
        perfil.setLinkedin(profileDTO.getLinkedin());

        // 2. Actualizamos imágenes SOLO si el usuario envió una nueva.
        // Si no envió nada, dejamos la URL que ya tenía guardada en la BD.

        if (isValidFile(profileDTO.getImagen())) {
            String urlImagen = fileServices.save(profileDTO.getImagen());
            perfil.setImagen(urlImagen);
        }

        if (isValidFile(profileDTO.getImageAbout())) {
            String urlAbout = fileServices.save(profileDTO.getImageAbout());
            perfil.setImageAbout(urlAbout);
        }

        if (isValidFile(profileDTO.getCurriculum())) {
            String urlCv = fileServices.save(profileDTO.getCurriculum());
            perfil.setCurriculum(urlCv);
        }

        return repoProfile.save(perfil);
    }

    @Override
    public String deleteProfile(Long id) {
        repoProfile.deleteById(id);
        return "Perfil " + id + " eliminado correctamente";
    }

    // --- MÉTODOS PRIVADOS (Helpers) ---

    // Método auxiliar para validar si un archivo es válido para subir
    private boolean isValidFile(MultipartFile file) {
        return file != null && !file.isEmpty();
    }
}