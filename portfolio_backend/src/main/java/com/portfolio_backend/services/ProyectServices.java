package com.portfolio_backend.services;

import com.portfolio_backend.models.Proyecto;
import com.portfolio_backend.models.dto.ProyectoDTO;
import com.portfolio_backend.repository.ProyectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.FileAlreadyExistsException;
import java.util.List;


@Service
public class ProyectServices implements IProyectService {

    @Autowired
    private ProyectRepository repoProyecto;

    @Autowired
    private FileServices fileServices;

    @Override
    public Proyecto crearProyecto(ProyectoDTO proyectoDTO) throws Exception {
        Proyecto proyecto = new Proyecto();

        // 1. Asignamos datos de texto
        proyecto.setNombre(proyectoDTO.getNombre());
        proyecto.setGithub(proyectoDTO.getGithub());
        proyecto.setLiveDemo(proyectoDTO.getLiveDemo());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setStack(proyectoDTO.getStack());

        // 2. Validamos si viene imagen y la subimos
        if(proyectoDTO.getImagen() != null && !proyectoDTO.getImagen().isEmpty()){
            String urlImagen = fileServices.save(proyectoDTO.getImagen());
            proyecto.setImagen(urlImagen);
        }

        return repoProyecto.save(proyecto);
    }

    @Override
    public List<Proyecto> getProyectos() {
        return repoProyecto.findAll();
    }

    @Override
    public Proyecto getProyecto(Long id) {
        return repoProyecto.findById(id).orElse(null);
    }

    @Override
    public Proyecto editProyecto(Long id, ProyectoDTO proyectoDTO) throws Exception {
        // 1. Buscamos el proyecto en la BD
        Proyecto proyecto = this.getProyecto(id);

        // (Opcional: chequeo de null por si el ID no existe)
        if (proyecto == null) return null;

        // 2. Actualizamos los campos de texto
        proyecto.setNombre(proyectoDTO.getNombre());
        proyecto.setGithub(proyectoDTO.getGithub());
        proyecto.setLiveDemo(proyectoDTO.getLiveDemo());
        if(proyectoDTO.getDescripcion() != null) {
            proyecto.setDescripcion(proyectoDTO.getDescripcion());
        }
        if(proyectoDTO.getStack() != null) {
            proyecto.setStack(proyectoDTO.getStack());
        }

        // 3. Lógica de la imagen:
        // Solo si el usuario envía un archivo nuevo, lo subimos y actualizamos la URL.
        // Si el campo viene vacío, NO HACEMOS NADA (se mantiene la foto vieja).
        if(proyectoDTO.getImagen() != null && !proyectoDTO.getImagen().isEmpty()){
            String url = fileServices.save(proyectoDTO.getImagen());
            proyecto.setImagen(url);
        }

        return repoProyecto.save(proyecto);
    }

    @Override
    public void deleteProyecto(Long id) {
        repoProyecto.deleteById(id);
    }
}
