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
    private FileServices fileServices;

    @Override
    public Profile guardarPerfil(ProfileDTO profileDTO) throws Exception {
        Profile perfil = new Profile();


        perfil.setName(profileDTO.getName());
        perfil.setEmail(profileDTO.getEmail());
        perfil.setCargo(profileDTO.getCargo());
        perfil.setGithub(profileDTO.getGithub());
        perfil.setLinkedin(profileDTO.getLinkedin());


        if (isValidFile(profileDTO.getImagen())) {
            String urlImagen = fileServices.save(profileDTO.getImagen(), "portfolio");
            perfil.setImagen(urlImagen);
        }

        if (isValidFile(profileDTO.getImageAbout())) {
            String urlAbout = fileServices.save(profileDTO.getImageAbout(), "portfolio");
            perfil.setImageAbout(urlAbout);
        }

        if (isValidFile(profileDTO.getCurriculum())) {
            String urlCv = fileServices.save(profileDTO.getCurriculum(), "portfolio");
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

        Profile perfil = this.getProfile(id);


        if (perfil == null) {
            return null;
        }


        perfil.setName(profileDTO.getName());
        perfil.setCargo(profileDTO.getCargo());
        perfil.setEmail(profileDTO.getEmail());
        perfil.setGithub(profileDTO.getGithub());
        perfil.setLinkedin(profileDTO.getLinkedin());




        if (isValidFile(profileDTO.getImagen())) {
            fileServices.delete(perfil.getImagen());
            String urlImagen = fileServices.save(profileDTO.getImagen(), "portfolio");
            perfil.setImagen(urlImagen);
        }

        if (isValidFile(profileDTO.getImageAbout())) {
            fileServices.delete(perfil.getImageAbout());
            String urlAbout = fileServices.save(profileDTO.getImageAbout(), "portfolio");
            perfil.setImageAbout(urlAbout);
        }

        if (isValidFile(profileDTO.getCurriculum())) {
            fileServices.delete(perfil.getCurriculum());
            String urlCv = fileServices.save(profileDTO.getCurriculum(), "portfolio");
            perfil.setCurriculum(urlCv);
        }

        return repoProfile.save(perfil);
    }

    @Override
    public String deleteProfile(Long id) {
        Profile perfil = this.getProfile(id);
        if (perfil != null) {
            fileServices.delete(perfil.getImagen());
            fileServices.delete(perfil.getImageAbout());
            fileServices.delete(perfil.getCurriculum());
        }
        repoProfile.deleteById(id);
        return "Perfil " + id + " eliminado correctamente";
    }
    private boolean isValidFile(MultipartFile file) {
        return file != null && !file.isEmpty();
    }
}