package com.portfolio_backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class FileServices implements IFileService { // Asegurate que tu interfaz coincida o ajustala

    @Autowired
    private Cloudinary cloudinary;

    // Ya no devuelvo void, devuelvo String (la URL de la imagen)
    public String save(MultipartFile file) throws IOException {
        // Map de opciones (podés configurar tamaño, formato, etc. acá si querés)
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        // Retornamos la URL segura que nos da Cloudinary
        return uploadResult.get("url").toString();
    }
}
