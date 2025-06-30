package com.senac.Calendario.Eventos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EventoRequest {
    
    @NotBlank
    @Size(min = 3, max = 100)
    private String titulo;
    
    @NotBlank
    @Size(min = 10, max = 500)
    private String descricao;
    
    @NotBlank
    private String data;
    
    @NotBlank
    private String hora;
    
    @NotBlank
    @Size(min = 3, max = 100)
    private String local;
    
    @NotBlank
    @Size(min = 3, max = 100)
    private String organizador;
    
    // Constructors
    public EventoRequest() {}
    
    public EventoRequest(String titulo, String descricao, String data, String hora, String local, String organizador) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.hora = hora;
        this.local = local;
        this.organizador = organizador;
    }
    
    // Getters and Setters
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public String getData() {
        return data;
    }
    
    public void setData(String data) {
        this.data = data;
    }
    
    public String getHora() {
        return hora;
    }
    
    public void setHora(String hora) {
        this.hora = hora;
    }
    
    public String getLocal() {
        return local;
    }
    
    public void setLocal(String local) {
        this.local = local;
    }
    
    public String getOrganizador() {
        return organizador;
    }
    
    public void setOrganizador(String organizador) {
        this.organizador = organizador;
    }
}