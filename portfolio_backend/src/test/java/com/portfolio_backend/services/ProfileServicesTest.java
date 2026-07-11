package com.portfolio_backend.services;

import com.portfolio_backend.models.Profile;
import com.portfolio_backend.models.dto.ProfileDTO;
import com.portfolio_backend.repository.ProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProfileServicesTest {

    @Mock
    private ProfileRepository repoProfile;

    @Mock
    private FileServices fileServices;

    @InjectMocks
    private ProfileServices profileServices;

    private Profile profile;
    private ProfileDTO profileDTO;

    @BeforeEach
    void setUp() {
        profile = new Profile();
        profile.setId(1L);
        profile.setName("Dardo Sanchez");
        profile.setEmail("dardo@gmail.com");
        profile.setCargo("Full Stack Developer");
        profile.setGithub("http://github.com/dardo");
        profile.setLinkedin("http://linkedin.com/in/dardo");
        profile.setImagen("http://cloudinary.com/profile.jpg");
        profile.setImageAbout("http://cloudinary.com/about.jpg");
        profile.setCurriculum("http://cloudinary.com/cv.pdf");

        profileDTO = new ProfileDTO();
        profileDTO.setName("Dardo Sanchez");
        profileDTO.setEmail("dardo@gmail.com");
        profileDTO.setCargo("Full Stack Developer");
        profileDTO.setGithub("http://github.com/dardo");
        profileDTO.setLinkedin("http://linkedin.com/in/dardo");
    }

    @Test
    void testGuardarPerfilWithoutFiles() throws Exception {
        when(repoProfile.save(any(Profile.class))).thenReturn(profile);

        Profile result = profileServices.guardarPerfil(profileDTO);

        assertNotNull(result);
        assertEquals("Dardo Sanchez", result.getName());
        verify(repoProfile, times(1)).save(any(Profile.class));
        verify(fileServices, never()).save(any(), anyString());
    }

    @Test
    void testGuardarPerfilWithFiles() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("imagen", "profile.jpg", "image/jpeg", "img".getBytes());
        MockMultipartFile aboutFile = new MockMultipartFile("imageAbout", "about.jpg", "image/jpeg", "about".getBytes());
        MockMultipartFile cvFile = new MockMultipartFile("curriculum", "cv.pdf", "application/pdf", "pdf".getBytes());

        profileDTO.setImagen(imageFile);
        profileDTO.setImageAbout(aboutFile);
        profileDTO.setCurriculum(cvFile);

        when(fileServices.save(imageFile, "portfolio")).thenReturn("http://cloudinary.com/new_profile.jpg");
        when(fileServices.save(aboutFile, "portfolio")).thenReturn("http://cloudinary.com/new_about.jpg");
        when(fileServices.save(cvFile, "portfolio")).thenReturn("http://cloudinary.com/new_cv.pdf");

        when(repoProfile.save(any(Profile.class))).thenAnswer(invocation -> {
            Profile p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });

        Profile result = profileServices.guardarPerfil(profileDTO);

        assertNotNull(result);
        assertEquals("http://cloudinary.com/new_profile.jpg", result.getImagen());
        assertEquals("http://cloudinary.com/new_about.jpg", result.getImageAbout());
        assertEquals("http://cloudinary.com/new_cv.pdf", result.getCurriculum());

        verify(fileServices, times(3)).save(any(), anyString());
        verify(repoProfile, times(1)).save(any(Profile.class));
    }

    @Test
    void testGetProfileById() {
        when(repoProfile.findById(1L)).thenReturn(Optional.of(profile));

        Profile result = profileServices.getProfile(1L);

        assertNotNull(result);
        assertEquals("Dardo Sanchez", result.getName());
    }

    @Test
    void testGetProfiles() {
        List<Profile> list = Arrays.asList(profile);
        when(repoProfile.findAll()).thenReturn(list);

        List<Profile> result = profileServices.getProfiles();

        assertEquals(1, result.size());
    }

    @Test
    void testEditProfile() throws Exception {
        when(repoProfile.findById(1L)).thenReturn(Optional.of(profile));
        when(repoProfile.save(any(Profile.class))).thenReturn(profile);

        profileDTO.setName("Dardo S.");
        Profile result = profileServices.editProfile(1L, profileDTO);

        assertNotNull(result);
        assertEquals("Dardo S.", result.getName());
    }

    @Test
    void testDeleteProfile() {
        doNothing().when(repoProfile).deleteById(1L);

        String result = profileServices.deleteProfile(1L);

        assertEquals("Perfil 1 eliminado correctamente", result);
        verify(repoProfile, times(1)).deleteById(1L);
    }
}
