package com.senac.Calendario.Eventos.controller;

import com.senac.Calendario.Eventos.dto.EventoRequest;
import com.senac.Calendario.Eventos.model.Evento;
import com.senac.Calendario.Eventos.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/eventos")
public class EventoController {
    
    @Autowired
    private EventoService eventoService;
    
    // Endpoint público para listar todos os eventos
    @GetMapping("/public")
    public ResponseEntity<List<Evento>> getAllEventosPublic() {
        List<Evento> eventos = eventoService.findAll();
        return ResponseEntity.ok(eventos);
    }
    
    // Endpoints protegidos (requerem autenticação)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Evento>> getAllEventos() {
        List<Evento> eventos = eventoService.findAll();
        return ResponseEntity.ok(eventos);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getEventoById(@PathVariable Long id) {
        Optional<Evento> evento = eventoService.findById(id);
        if (evento.isPresent()) {
            return ResponseEntity.ok(evento.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Evento não encontrado");
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEvento(@Valid @RequestBody EventoRequest eventoRequest) {
        try {
            Evento evento = eventoService.save(eventoRequest);
            return ResponseEntity.ok(evento);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro ao criar evento: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateEvento(@PathVariable Long id, @Valid @RequestBody EventoRequest eventoRequest) {
        try {
            Evento evento = eventoService.update(id, eventoRequest);
            return ResponseEntity.ok(evento);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro ao atualizar evento: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEvento(@PathVariable Long id) {
        try {
            eventoService.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Evento deletado com sucesso");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search/titulo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Evento>> searchByTitulo(@RequestParam String titulo) {
        List<Evento> eventos = eventoService.findByTitulo(titulo);
        return ResponseEntity.ok(eventos);
    }
    
    @GetMapping("/search/organizador")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Evento>> searchByOrganizador(@RequestParam String organizador) {
        List<Evento> eventos = eventoService.findByOrganizador(organizador);
        return ResponseEntity.ok(eventos);
    }
}