package com.portfolio_backend.services;

import com.portfolio_backend.models.Proyecto;
import com.portfolio_backend.models.dto.ProyectoDTO;
import com.portfolio_backend.repository.ProyectRepository;
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
public class ProyectServicesTest {

    @Mock
    private ProyectRepository repoProyecto;

    @Mock
    private FileServices fileServices;

    @InjectMocks
    private ProyectServices proyectServices;

    private Proyecto proyecto;
    private ProyectoDTO proyectoDTO;

    @BeforeEach
    void setUp() {
        proyecto = new Proyecto();
        proyecto.setId(1L);
        proyecto.setNombre("Test Project");
        proyecto.setDescripcion("Description");
        proyecto.setStack("React, Java");
        proyecto.setGithub("http://github.com");
        proyecto.setLiveDemo("http://demo.com");
        proyecto.setImagen("http://cloudinary.com/img.jpg");

        proyectoDTO = new ProyectoDTO();
        proyectoDTO.setNombre("Test Project");
        proyectoDTO.setDescripcion("Description");
        proyectoDTO.setStack("React, Java");
        proyectoDTO.setGithub("http://github.com");
        proyectoDTO.setLiveDemo("http://demo.com");
    }

    @Test
    void testCrearProyectoWithoutImage() throws Exception {
        when(repoProyecto.save(any(Proyecto.class))).thenReturn(proyecto);

        Proyecto result = proyectServices.crearProyecto(proyectoDTO);

        assertNotNull(result);
        assertEquals("Test Project", result.getNombre());
        verify(repoProyecto, times(1)).save(any(Proyecto.class));
        verify(fileServices, never()).save(any());
    }

    @Test
    void testCrearProyectoWithImage() throws Exception {
        MockMultipartFile file = new MockMultipartFile("imagen", "test.jpg", "image/jpeg", "image".getBytes());
        proyectoDTO.setImagen(file);

        when(fileServices.save(file)).thenReturn("http://cloudinary.com/new.jpg");
        when(repoProyecto.save(any(Proyecto.class))).thenAnswer(invocation -> {
            Proyecto p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });

        Proyecto result = proyectServices.crearProyecto(proyectoDTO);

        assertNotNull(result);
        assertEquals("http://cloudinary.com/new.jpg", result.getImagen());
        verify(fileServices, times(1)).save(file);
        verify(repoProyecto, times(1)).save(any(Proyecto.class));
    }

    @Test
    void testGetProyectos() {
        List<Proyecto> lista = Arrays.asList(proyecto);
        when(repoProyecto.findAll()).thenReturn(lista);

        List<Proyecto> result = proyectServices.getProyectos();

        assertEquals(1, result.size());
        assertEquals("Test Project", result.get(0).getNombre());
    }

    @Test
    void testGetProyectoById() {
        when(repoProyecto.findById(1L)).thenReturn(Optional.of(proyecto));

        Proyecto result = proyectServices.getProyecto(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testEditProyecto() throws Exception {
        when(repoProyecto.findById(1L)).thenReturn(Optional.of(proyecto));
        when(repoProyecto.save(any(Proyecto.class))).thenReturn(proyecto);

        proyectoDTO.setNombre("Updated Name");
        Proyecto result = proyectServices.editProyecto(1L, proyectoDTO);

        assertNotNull(result);
        assertEquals("Updated Name", result.getNombre());
    }

    @Test
    void testDeleteProyecto() {
        doNothing().when(repoProyecto).deleteById(1L);

        proyectServices.deleteProyecto(1L);

        verify(repoProyecto, times(1)).deleteById(1L);
    }
}
