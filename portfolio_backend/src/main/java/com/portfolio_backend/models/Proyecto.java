package com.portfolio_backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    private String imagen;
    private String github;
    private String liveDemo;
    @Column(length = 500) // Le damos espacio para texto largo
    private String descripcion;

    private String stack;

}
