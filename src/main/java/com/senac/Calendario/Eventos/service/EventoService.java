package com.senac.Calendario.Eventos.service;

import com.senac.Calendario.Eventos.model.Evento;
import com.senac.Calendario.Eventos.repository.EventoRepository;
import com.senac.Calendario.Eventos.dto.EventoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    
    @Autowired
    private EventoRepository eventoRepository;
    
    public List<Evento> findAll() {
        return eventoRepository.findAllOrderByCreatedAtDesc();
    }
    
    public Optional<Evento> findById(Long id) {
        return eventoRepository.findById(id);
    }
    
    public Evento save(EventoRequest eventoRequest) {
        Evento evento = new Evento();
        evento.setTitulo(eventoRequest.getTitulo());
        evento.setDescricao(eventoRequest.getDescricao());
        evento.setData(eventoRequest.getData());
        evento.setHora(eventoRequest.getHora());
        evento.setLocal(eventoRequest.getLocal());
        evento.setOrganizador(eventoRequest.getOrganizador());
        
        return eventoRepository.save(evento);
    }
    
    public Evento update(Long id, EventoRequest eventoRequest) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado com id: " + id));
        
        evento.setTitulo(eventoRequest.getTitulo());
        evento.setDescricao(eventoRequest.getDescricao());
        evento.setData(eventoRequest.getData());
        evento.setHora(eventoRequest.getHora());
        evento.setLocal(eventoRequest.getLocal());
        evento.setOrganizador(eventoRequest.getOrganizador());
        
        return eventoRepository.save(evento);
    }
    
    public void deleteById(Long id) {
        if (!eventoRepository.existsById(id)) {
            throw new RuntimeException("Evento não encontrado com id: " + id);
        }
        eventoRepository.deleteById(id);
    }
    
    public List<Evento> findByTitulo(String titulo) {
        return eventoRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    public List<Evento> findByOrganizador(String organizador) {
        return eventoRepository.findByOrganizadorContainingIgnoreCase(organizador);
    }
}