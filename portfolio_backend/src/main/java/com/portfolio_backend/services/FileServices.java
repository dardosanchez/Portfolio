package com.portfolio_backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class FileServices implements IFileService {

    @Autowired
    private Cloudinary cloudinary;


    @Override
    public String save(MultipartFile file) throws IOException {
        return save(file, null);
    }

    @Override
    public String save(MultipartFile file, String folder) throws IOException {
        java.util.Map<String, Object> options = new java.util.HashMap<>();
        if (folder != null && !folder.trim().isEmpty()) {
            options.put("folder", folder);
        }
        
        options.put("resource_type", "auto");
        options.put("overwrite", true);
        
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && !originalFilename.isEmpty()) {
            int lastDot = originalFilename.lastIndexOf('.');
            String baseName = (lastDot == -1) ? originalFilename : originalFilename.substring(0, lastDot);
            String cleanName = baseName.replaceAll("[^a-zA-Z0-9\\-_]", "_");
            options.put("public_id", cleanName);
        }
        
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public void delete(String url) {
        if (url == null || url.trim().isEmpty()) {
            return;
        }
        try {
            String publicId = extractPublicId(url);
            String resourceType = extractResourceType(url);
            if (publicId != null) {
                java.util.Map<String, Object> options = new java.util.HashMap<>();
                options.put("resource_type", resourceType);
                cloudinary.uploader().destroy(publicId, options);
            }
        } catch (Exception e) {
            System.err.println("Error al eliminar archivo de Cloudinary: " + e.getMessage());
        }
    }

    private String extractPublicId(String url) {
        int uploadIdx = url.indexOf("/upload/");
        if (uploadIdx == -1) return null;
        
        String postUpload = url.substring(uploadIdx + 8);
        int slashIdx = postUpload.indexOf('/');
        if (slashIdx != -1 && postUpload.substring(0, slashIdx).matches("v\\d+")) {
            postUpload = postUpload.substring(slashIdx + 1);
        }
        
        String resourceType = extractResourceType(url);
        if ("raw".equals(resourceType)) {
            return postUpload;
        } else {
            int dotIdx = postUpload.lastIndexOf('.');
            if (dotIdx != -1) {
                return postUpload.substring(0, dotIdx);
            }
            return postUpload;
        }
    }

    private String extractResourceType(String url) {
        String[] parts = url.split("/");
        for (int i = 0; i < parts.length; i++) {
            if ("upload".equals(parts[i]) && i > 0) {
                return parts[i - 1];
            }
        }
        return "image";
    }
}
