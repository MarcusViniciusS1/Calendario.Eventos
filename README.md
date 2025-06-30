# Sistema de Calendário de Eventos

Sistema completo de gerenciamento de eventos desenvolvido com Spring Boot, PostgreSQL e autenticação JWT.

## Tecnologias Utilizadas

- **Backend**: Java 17, Spring Boot 3.2.0
- **Banco de Dados**: PostgreSQL
- **Segurança**: Spring Security + JWT
- **Arquitetura**: MVC (Model-View-Controller)

## Funcionalidades

### Públicas
- Visualização de todos os eventos cadastrados
- Interface responsiva e moderna

### Administrativas (Requer Login)
- Login com JWT
- CRUD completo de eventos
- Busca por título e organizador
- Gerenciamento seguro de dados

## Configuração do Banco de Dados

1. Instale o PostgreSQL
2. Crie um banco de dados chamado `calendario_eventos`
3. Configure as credenciais no `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/calendario_eventos
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## Como Executar

1. Clone o repositório
2. Configure o PostgreSQL
3. Execute o comando:
```bash
./mvnw spring-boot:run
```

## Credenciais Padrão

- **Usuário**: ADM
- **Senha**: ADM123

## Endpoints da API

### Autenticação
- `POST /api/auth/signin` - Login
- `POST /api/auth/signup` - Registro

### Eventos Públicos
- `GET /api/eventos/public` - Listar todos os eventos

### Eventos (Requer Autenticação)
- `GET /api/eventos` - Listar eventos
- `GET /api/eventos/{id}` - Buscar evento por ID
- `POST /api/eventos` - Criar evento
- `PUT /api/eventos/{id}` - Atualizar evento
- `DELETE /api/eventos/{id}` - Deletar evento
- `GET /api/eventos/search/titulo?titulo=` - Buscar por título
- `GET /api/eventos/search/organizador?organizador=` - Buscar por organizador

## Estrutura do Projeto

```
src/main/java/com/senac/Calendario/Eventos/
├── config/          # Configurações e inicializadores
├── controller/      # Controllers REST
├── dto/            # Data Transfer Objects
├── model/          # Entidades JPA
├── repository/     # Repositórios JPA
├── security/       # Configurações de segurança JWT
└── service/        # Lógica de negócio
```

## Recursos Implementados

✅ Autenticação JWT  
✅ CRUD completo de eventos  
✅ Estrutura MVC  
✅ Conexão com PostgreSQL  
✅ Validação de dados  
✅ Tratamento de erros  
✅ CORS configurado  
✅ Dados iniciais automáticos  
✅ Endpoints públicos e protegidos  
✅ Busca e filtros  

O sistema está pronto para produção e pode ser facilmente integrado com o frontend React.