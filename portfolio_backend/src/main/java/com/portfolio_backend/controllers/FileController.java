package com.portfolio_backend.controllers;

import com.portfolio_backend.services.FileServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/file")
@CrossOrigin(value = "http://localhost:5173") // Acordate de la configuración global de CORS más adelante
public class FileController {

    @Autowired
    private FileServices fileServices;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("files") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        try {
            // Usamos el servicio que ahora devuelve la URL de Cloudinary
            String url = fileServices.save(file);

            response.put("message", "Archivo subido correctamente");
            response.put("url", url); // Devolvemos la URL para que el front la pueda ver

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("message", "Error al subir el archivo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}