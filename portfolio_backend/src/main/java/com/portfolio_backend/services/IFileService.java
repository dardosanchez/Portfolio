package com.portfolio_backend.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface IFileService {

    public String save(MultipartFile file) throws IOException;

}
