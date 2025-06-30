package com.senac.Calendario.Eventos.controller;

import com.senac.Calendario.Eventos.dto.JwtResponse;
import com.senac.Calendario.Eventos.dto.LoginRequest;
import com.senac.Calendario.Eventos.model.Usuario;
import com.senac.Calendario.Eventos.security.JwtUtils;
import com.senac.Calendario.Eventos.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UsuarioService usuarioService;
    
    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            Usuario usuario = usuarioService.findByUsername(loginRequest.getUsername());
            
            return ResponseEntity.ok(new JwtResponse(jwt, usuario.getUsername(), usuario.getRole().toString()));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Credenciais inválidas");
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody LoginRequest signUpRequest) {
        if (usuarioService.existsByUsername(signUpRequest.getUsername())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro: Nome de usuário já está em uso!");
            return ResponseEntity.badRequest().body(error);
        }
        
        Usuario usuario = usuarioService.createUser(signUpRequest.getUsername(), signUpRequest.getPassword());
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuário registrado com sucesso!");
        return ResponseEntity.ok(response);
    }
}