package com.portfolio_backend.services;

import com.portfolio_backend.models.Proyecto;
import com.portfolio_backend.models.dto.ProyectoDTO;
import com.portfolio_backend.repository.ProyectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


        proyecto.setNombre(proyectoDTO.getNombre());
        proyecto.setGithub(proyectoDTO.getGithub());
        proyecto.setLiveDemo(proyectoDTO.getLiveDemo());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setStack(proyectoDTO.getStack());


        if(proyectoDTO.getImagen() != null && !proyectoDTO.getImagen().isEmpty()){
            String urlImagen = fileServices.save(proyectoDTO.getImagen(), "portfolio");
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

        Proyecto proyecto = this.getProyecto(id);


        if (proyecto == null) return null;


        proyecto.setNombre(proyectoDTO.getNombre());
        proyecto.setGithub(proyectoDTO.getGithub());
        proyecto.setLiveDemo(proyectoDTO.getLiveDemo());
        if(proyectoDTO.getDescripcion() != null) {
            proyecto.setDescripcion(proyectoDTO.getDescripcion());
        }
        if(proyectoDTO.getStack() != null) {
            proyecto.setStack(proyectoDTO.getStack());
        }

        if(proyectoDTO.getImagen() != null && !proyectoDTO.getImagen().isEmpty()){
            fileServices.delete(proyecto.getImagen());
            String url = fileServices.save(proyectoDTO.getImagen(), "portfolio");
            proyecto.setImagen(url);
        }

        return repoProyecto.save(proyecto);
    }

    @Override
    public void deleteProyecto(Long id) {
        Proyecto proyecto = this.getProyecto(id);
        if (proyecto != null) {
            fileServices.delete(proyecto.getImagen());
        }
        repoProyecto.deleteById(id);
    }
}
