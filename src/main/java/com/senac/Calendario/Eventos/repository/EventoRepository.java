package com.senac.Calendario.Eventos.repository;

import com.senac.Calendario.Eventos.entitys.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    
    @Query("SELECT e FROM Evento e ORDER BY e.createdAt DESC")
    List<Evento> findAllOrderByCreatedAtDesc();
    
    List<Evento> findByTituloContainingIgnoreCase(String titulo);
    
    List<Evento> findByOrganizadorContainingIgnoreCase(String organizador);
}