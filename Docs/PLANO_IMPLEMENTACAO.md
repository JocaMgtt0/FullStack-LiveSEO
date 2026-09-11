# Plano de Implementação — Desafio Técnico Fullstack Júnior

> Fluxo de trabalho: cada linha da tabela abaixo é um tópico independente. O Joaquim aprova um tópico por vez (ex: "pode fazer a Etapa 1") e o Claude implementa **só aquele tópico**, atualizando a coluna Status ao final. Nada é implementado sem aprovação prévia.

## Sumário

| # | Etapa | Pasta | Tecnologia | Status |
|---|-------|-------|------------|--------|
| 1 | Formulário de cadastro | `Etapa 1` | HTML + CSS | 🟢 Concluído |
| 2 | To-Do List | `Etapa 2` | Vue 3 (Composition API) | 🟢 Concluído |
| 3 | Filtro de usuários tipado | `Etapa 3` | TypeScript | 🟢 Concluído |
| 4 | Queries de usuários | `Etapa 4` | SQL (MySQL) | 🟢 Concluído |
| 5 | API de usuários | `Etapa 5` | NestJS | 🟢 Concluído |
| 6 | Estratégia de commits | raiz do repositório | Git | ⬜ Pendente |
| 7 | Organização de projeto (dissertativo) | `EXPLICACOES.md` | — | ⬜ Pendente |
| 8 | Cenário de performance (dissertativo) | `EXPLICACOES.md` | — | ⬜ Pendente |
| 9 | Uso de ferramentas de IA (dissertativo) | `EXPLICACOES.md` | — | ⬜ Pendente |
| 10 | README.md final + link do GitHub | raiz do repositório | Markdown | ⬜ Pendente |

Legenda: ⬜ Pendente · 🟡 Em andamento · 🟢 Aprovado/Concluído

---

## Etapa 1 — Formulário de Cadastro (HTML + CSS)

**Pasta:** `Etapa 1` (já existe com `form.html` e `style.css` vazio)

**O que precisa ser feito:**
- Corrigir o bug já presente: os campos Nome e E-mail estão com `id="nome"` duplicado — cada `input` precisa de `id`/`name`/`label` únicos.
- Trocar os `<span><p>...</p></span>` por `<label for="...">` corretamente associados aos inputs (mais semântico e acessível).
- Adicionar `required` e `minlength` no campo Senha, `required` no Nome, e usar `type="email"` (o navegador já valida formato) no E-mail — validação HTML5 nativa, reforçada com CSS de feedback (`:invalid`, `:focus`).
- Estilizar o botão de enviar (hover, disabled, cores) e o formulário como um card centralizado.
- Preencher `style.css` (hoje vazio) com um layout simples: reset básico, formulário centralizado, inputs com estado de erro.
- Adicionar mensagens de erro visíveis via CSS/HTML (`:invalid` + `::after` ou `<span class="erro">`) sem depender de JavaScript, já que o desafio pede "regras básicas" — mas posso adicionar um JS leve opcional para mensagens customizadas em português.

**Melhor abordagem:** HTML semântico + validação nativa (`required`, `type="email"`, `pattern`/`minlength`) é suficiente e é o que se espera de um teste júnior — evita reinventar validação em JS quando o HTML5 já resolve. CSS separado em `style.css`, sem frameworks, para mostrar domínio de CSS puro (flexbox para o layout do form, pseudo-classes para os estados).

---

## Etapa 2 — To-Do List (Vue 3 Composition API)

**Pasta:** `Etapa 2`

**O que precisa ser feito:**
- Projeto Vue 3 mínimo com Vite (`npm create vite@latest . -- --template vue`).
- Um componente principal (`App.vue`) ou, melhor, separar em:
  - `TodoInput.vue` — input + botão de adicionar.
  - `TodoItem.vue` — item individual (checkbox de concluído + botão remover).
  - `TodoList.vue` — renderiza a lista, recebe as tarefas filtradas.
  - `TodoFilter.vue` — botões todas/pendentes/concluídas (bônus).
- **Primitivas da Composition API:**
  - `ref` para a lista de tarefas (array de objetos `{id, texto, concluida}`) e para o texto do input — dado simples e substituível.
  - `computed` para a lista filtrada (deriva de `ref` da lista + `ref` do filtro ativo, sem duplicar estado).
  - Não usar `reactive` aqui: com um único array como estado central, `ref` já é suficiente e evita a armadilha de desestruturação perder reatividade.
  - Extrair a lógica de tarefas para um composable `useTodos.ts` (`adicionar`, `remover`, `alternarConcluida`, `filtro`) — separa lógica de estado da camada de apresentação, prática comum em Vue 3.

**Melhor abordagem:** organizar por composable + componentes burros (apresentação) é o padrão recomendado em Vue 3 Composition API — facilita testar a lógica isolada da UI e demonstra entendimento de reatividade (por que `ref` vs `reactive`, por que `computed` em vez de recalcular no template).

---

## Etapa 3 — TypeScript (filtro tipado/genérico)

**Pasta:** `Etapa 3`

**O que precisa ser feito:**
- `interface User { id: number; name: string; age: number }` para tipar o array `users`.
- Função básica: `getNamesOlderThan23(users: User[]): string[]`.
- **Bônus (genérica):** `filterByNumericField<T, K extends keyof T>(items: T[], field: K, min: number): T[]` — usando `keyof T` restrito a campos numéricos via um tipo condicional (`T[K] extends number ? K : never`) para impedir, em tempo de compilação, passar um campo não numérico como `name`.
- Arquivo único `index.ts` com os `users`, as funções, e chamadas de exemplo no console.

**Melhor abordagem:** usar genéricos com `keyof` é o jeito idiomático de tipar "filtrar por qualquer campo" sem recorrer a `any`; o tipo condicional para restringir a campos numéricos mostra domínio mais avançado de TS, que é justamente o que o bônus está testando.

---

## Etapa 4 — Banco de Dados (SQL)

**Pasta:** `Etapa 4`

**O que precisa ser feito:**
- Arquivo `queries.sql` com:
  1. `SELECT * FROM users ORDER BY created_at DESC;` — mais recente primeiro.
  2. Bônus: `SELECT DATE_FORMAT(created_at, '%Y-%m') AS mes, COUNT(*) AS total FROM users GROUP BY mes ORDER BY mes;` — contagem por mês.
- Opcional: um `schema.sql` com o `CREATE TABLE users (...)` para o desafio ser executável do zero (mostra cuidado extra).

**Melhor abordagem:** `DATE_FORMAT` é específico do MySQL (o desafio pede MySQL/SQL) e é a forma mais direta de agrupar por ano-mês sem funções auxiliares. Comentar cada query explicando `ORDER BY`/`GROUP BY` no próprio arquivo.

---

## Etapa 5 — Backend (NestJS)

**Pasta:** `Etapa 5`

**O que precisa ser feito:**
- `nest new .` (ou `npx @nestjs/cli new`) gerando a estrutura padrão.
- Módulo `UsersModule` com:
  - `users.controller.ts` — `GET /users` e `POST /users`.
  - `users.service.ts` — array em memória com os usuários seed (Ana, Pedro) + método `create`.
  - `dto/create-user.dto.ts` — `class CreateUserDto { name: string; email: string }` com `class-validator` (`@IsString`, `@IsEmail`) para validar o corpo do POST.
  - `interfaces/user.interface.ts` — tipo `User`.
- `main.ts` com `ValidationPipe` global para o DTO ser aplicado automaticamente.

**Melhor abordagem:** seguir a estrutura modular padrão do Nest (controller = rotas, service = lógica/estado, dto = validação de entrada) é o que a comunidade e a documentação oficial recomendam, e é exatamente a "organização de arquivos" que o próprio desafio pede para explicar na Etapa 5. Usar `class-validator` no DTO em vez de validação manual no controller mostra uso idiomático do framework.

---

## Etapa 6 — Git (estratégia de commits)

**Não gera pasta própria** — aplica-se ao repositório inteiro.

**O que precisa ser feito:**
- Inicializar o repositório (`git init`) assim que o usuário aprovar, e criar o repositório remoto no GitHub.
- Estratégia de **commits incrementais por etapa** (mínimo 3, idealmente 1+ por etapa concluída), por exemplo:
  1. `feat: estrutura inicial do projeto e formulário HTML/CSS`
  2. `feat: to-do list em Vue 3 com Composition API`
  3. `feat: função utilitária de filtro em TypeScript`
  4. `feat: queries SQL de usuários`
  5. `feat: API de usuários em NestJS`
  6. `docs: README e explicações do desafio`
- Isso já demonstra evolução real do trabalho (o que o desafio pede explicitamente), em vez de um único commit final.

---

## Etapas 7, 8 e 9 — Respostas dissertativas

**Destino:** `EXPLICACOES.md` (ou seção do `README.md`)

- **Etapa 7 (Organização de projeto):** descrever estrutura de pastas recomendada para um projeto Vue 3 (`src/components`, `src/composables`, `src/views`, `src/router`, `src/stores`, `src/services`) e para NestJS (`src/modules/<feature>/{controller,service,dto,entities}`), com justificativa de separação por responsabilidade/feature.
- **Etapa 8 (Cenário de performance no login):** roteiro de investigação (DevTools Network/Performance, tempo de resposta do backend, tamanho de bundle, chamadas duplicadas, N+1 em banco) + duas soluções concretas (lazy loading/code splitting no frontend, cache/índice no backend, por exemplo).
- **Etapa 9 (Uso de IA):** relato honesto de como o Claude Code foi usado neste desafio (com base neste próprio histórico documentado em `CONVERSA.md`), um exemplo concreto de ajuda, e uma explicação de MCP/agentes de IA.

---

## Etapa 10 — README.md final e entrega

**Pasta:** raiz do repositório

- `README.md` com: descrição do projeto, como rodar cada etapa (comandos por pasta), link do repositório.
- Confirmar que `EXPLICACOES.md` cobre as explicações pedidas em cada etapa (1 a 9 do desafio).
- Revisar se há pelo menos 3 commits mostrando evolução antes de enviar o link.

