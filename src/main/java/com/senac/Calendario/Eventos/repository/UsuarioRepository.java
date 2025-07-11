package com.senac.Calendario.Eventos.repository;

import com.senac.Calendario.Eventos.entitys.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Boolean existsByUsername(String username);
}