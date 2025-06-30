package com.senac.Calendario.Eventos.config;

import com.senac.Calendario.Eventos.model.Usuario;
import com.senac.Calendario.Eventos.model.Evento;
import com.senac.Calendario.Eventos.repository.UsuarioRepository;
import com.senac.Calendario.Eventos.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EventoRepository eventoRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {

        if (!usuarioRepository.existsByUsername("ADM")) {
            Usuario admin = new Usuario();
            admin.setUsername("ADM");
            admin.setPassword(passwordEncoder.encode("ADM123"));
            admin.setRole(Usuario.Role.ADMIN);
            usuarioRepository.save(admin);
            System.out.println("Usuário admin criado: ADM/ADM123");
        }
        

        if (eventoRepository.count() == 0) {
            Evento evento1 = new Evento();
            evento1.setTitulo("Workshop de Tecnologia");
            evento1.setDescricao("Treinamento prático sobre ferramentas e tecnologias recentes para melhorar a produtividade e inovação.");
            evento1.setData("01/07/2024");
            evento1.setHora("14:00");
            evento1.setLocal("Auditório Central");
            evento1.setOrganizador("Carlos Mendes");
            eventoRepository.save(evento1);
            
            Evento evento2 = new Evento();
            evento2.setTitulo("Apresentação de Resultados");
            evento2.setDescricao("Sessão de apresentação dos resultados obtidos no último semestre, incluindo análises e métricas importantes.");
            evento2.setData("02/07/2024");
            evento2.setHora("10:30");
            evento2.setLocal("Sala 102");
            evento2.setOrganizador("Juliana Costa");
            eventoRepository.save(evento2);
            
            Evento evento3 = new Evento();
            evento3.setTitulo("Palestra Motivacional");
            evento3.setDescricao("Palestra especial com um convidado renomado para motivar e engajar os colaboradores em novos desafios.");
            evento3.setData("03/07/2024");
            evento3.setHora("15:00");
            evento3.setLocal("Sala 201");
            evento3.setOrganizador("Fernando Rocha");
            eventoRepository.save(evento3);
            
            System.out.println("Eventos de exemplo criados");
        }
    }
}