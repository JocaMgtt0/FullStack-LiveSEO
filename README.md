# Desafio Técnico - Pessoa Desenvolvedora Fullstack Júnior

Repositório: https://github.com/JocaMgtt0/FullStack-LiveSEO

## Estrutura de pastas

```
devFullStackLive/
├── Etapa 1/   -> HTML + CSS
├── Etapa 2/   -> Vue 3 (Composition API)
├── Etapa 3/   -> TypeScript
├── Etapa 4/   -> Banco de Dados (MySQL / SQL)
├── Etapa 5/   -> Backend (NestJS)
└── Docs/      -> Plano de implementação e registro da conversa com a IA
```

## Como rodar cada etapa

**Etapa 1 (HTML + CSS)**
Não precisa de instalação, só abrir o arquivo `Etapa 1/form.html` direto no navegador.

**Etapa 2 (Vue 3)**
```bash
cd "Etapa 2"
npm install
npm run dev
```

**Etapa 3 (TypeScript)**
```bash
cd "Etapa 3"
npm install
npm run build
npm start
```

**Etapa 4 (SQL)**
Importar `Etapa 4/schema.sql` em um banco MySQL (cria a tabela `users` já com dados de exemplo), depois rodar as queries de `Etapa 4/queries.sql`.

**Etapa 5 (NestJS)**
```bash
cd "Etapa 5"
npm install
npm run start:dev
```
A API sobe em `http://localhost:3000`, com `GET /users` e `POST /users`.

---

## Respostas das questões teóricas

/Etapa 1

Questao: Explique como organizou seu HTML e CSS.
Resposta: Organizei meu HTML de forma simples, porém funcional. Como o objetivo era criar um formulário, coloquei tudo dentro de uma main (assim consigo agrupar o conjunto inteiro e trabalhar nele como um bloco só). Dentro do form, ficam o h1, os label e os input. Também separei cada campo (label, input e mensagem de erro) dentro de uma div própria, com a classe campo; isso facilita tanto a organização quanto a estilização, já que aplicando display flex com flex-direction column nessa div, o alinhamento vertical já fica resolvido. As mensagens de erro ficam dentro de um span, escondido por padrão, que só se torna visível via CSS quando o campo está inválido.

Já no CSS, usei uma combinação de seletores por tag (para estilos gerais, como body, h1, label, input e button) e por classe (.card, .campo, .mensagem-erro, para os blocos que precisavam de um estilo mais específico). Também aproveitei o aninhamento nativo do CSS, colocando os seletores de label, input e .campo dentro do próprio bloco do form, o que evita repetir form várias vezes e deixa o arquivo mais legível. Outro ponto foi a definição de variáveis de cor no root, para manter a paleta padronizada em todo o sistema.

/Etapa 2

Questao: Explique como organizou os componentes, quais primitivas da Composition API usou (ref, reactive, computed, etc.) e por quê.

Resposta: Organizei os componentes usando o Vite como base, seguindo a documentação oficial do Vue para gerar a estrutura inicial do projeto. Depois disso, organizei os componentes dentro da pasta "src/components", e é nela que ficam os principais: TodoFilter, TodoInput, TodoItem e TodoList. Cada um possui outras coisas dentro que os compõem, mas em grande parte quis fazer componentes genéricos, que fossem possíveis de reutilizar em outros pedaços do código. Temos o App.vue, que é o orquestrador de tudo: ele chama todos os componentes e, dentro dele, faz o desempacotamento (destructuring) das propriedades que a função useTodos (do composable useTodos.js) retorna.

Eu poderia ter feito de outra forma, mais orientada a objetos: teria atributos privados dentro desse useTodos.js, com métodos públicos (set/get), e os componentes, em vez de se comunicarem por meio de "sinais" (já que hoje eles não têm acesso direto ao método, apenas mandam o que têm via emit e pedem o que precisam via prop), chamariam o método necessário diretamente. Isso tem pontos positivos e negativos. O positivo de ser mais orientado a objetos é que fica muito mais simples entender e ler o código, e ver o que cada coisa faz. O negativo é que, se for preciso escalar o código ou usar esse componente em um lugar totalmente diferente, isso acaba se tornando mais complicado. Já a forma que eu fiz (usando emit e props) é uma abordagem que considero mais difícil de implementar, mas que permite uma escalabilidade muito maior, pois o componente nunca tem acesso à lógica interna do processamento dos dados que ele envia, o que torna muito mais fácil reutilizar e escalar esse código.

Agora falando sobre as primitivas da Composition API: usei o ref e o computed, e acabei não usando outras, como por exemplo o reactive. No useTodos.js, usei o ref para a lista de tarefas; usando reactive, acredito que não seria tão bom, porque ele se dá melhor com objetos, e eu perderia a reatividade de propriedades soltas ali. Também usei o computed na função tarefasFiltradas, para deixar em cache o resultado da lista filtrada enquanto as dependências (tarefas e filtro) não mudam. Ou seja: se fosse uma função normal, toda vez que o usuário acessasse, a função seria executada de novo. Usando o computed, o resultado fica em cache e só é recalculado de fato quando a lista ou o filtro mudam, quando o Vue marca o valor como desatualizado. Fora isso, ele apenas devolve o valor já calculado, guardado em memória.

/Etapa 3

Questao: Explique como você declarou os tipos e o porquê.
Resposta: Eu defini uma interface chamada User, pois queria apenas mapear o formato do objeto; nesse caso, a interface já resolvia. Poderia ter usado o type, funcionaria igual, porém sem necessidade. Após isso, consegui trabalhar com o tipo User e fazer os mapeamentos necessários: para devolver apenas quem tem mais de 23 anos, é só fazer um filter para filtrar quem tem mais de 23 anos e um map para pegar o nome.

Já o bônus, eu utilizei o type, pois ali era um mapped type (tipo mapeado), e como a questão pediu algo genérico, pensei de duas formas. Inicialmente pensei em fazer uma implementação com um if que verificava o nome da chave e fazia a checagem na própria chave que foi passada; o problema é que não seria 100% genérico: se essa função fosse reutilizada em outro objeto, não funcionaria, teria que adicionar outras validações com if. Funcionaria apenas nesse cenário, sem contar que aí seria avaliado em tempo de execução, o que pode gerar erros silenciosos (passar um campo errado não quebraria o código, só devolveria um resultado sem sentido, sem avisar ninguém).

O que pensei depois foi usar o any, porém ele é um pouco evitado, pois não preserva o tipo do objeto, e eu precisava preservar o tipo passado. Nesse caso, optei pelo mapped type. Ele vai "filtrar" tudo que for number e deixar como never o que não for. Assim, dependendo do campo passado ("age" ou "id"), ele recebe o tipo literal correspondente (o próprio nome do campo), e um K que estende o tipo que foi criado com o type. Após isso, defini os parâmetros da função, e ela faz a filtragem sobre a lista.

O momento exato em que ele faz a verificação do tipo é na chamada da função, onde ele vê se K estende (extends) NumericKeys ou não. Nesse caso, NumericKeys tem duas opções: "age" ou "id". Se não for nenhuma dessas, dá erro, dizendo que o tipo não está definido em NumericKeys. Assim, qualquer campo novo que seja number poderá ser usado nessa função, que já vai funcionar automaticamente, sem precisar de nenhuma alteração.

/Etapa 4
Questao: Explique o funcionamento das suas queries.
Resposta: Então, elas funcionam da seguinte forma. A primeira query vai listar todos os usuários do mais recente para o mais antigo. É uma query simples: fiz um select buscando id, name, email e created_at na tabela users, ordenando pela coluna created_at de forma decrescente, ou seja, do maior valor de data para o menor, sendo assim, do mais recente para o mais antigo.
Já a segunda, que é o bônus, é um pouco mais complexa: ela conta quantos usuários foram criados por mês. Primeiro, uso a função DATE_FORMAT (função nativa do SQL) pra pegar a data completa e formatar do jeito que eu quiser, nesse caso reduzindo pra ano e mês (ex: 2024-02). Depois, uso o GROUP BY nesse mês formatado, que agrupa todas as linhas que caíram no mesmo mês numa única linha. É esse agrupamento que faz o COUNT(*) contar certo: em vez de contar todos os usuários de uma vez, ele conta quantos existem dentro de cada grupo (cada mês), dando o total de usuários criados naquele mês específico.

/Etapa 5
Questao: Explique como organizou os arquivos (módulos, controllers, services) e a estrutura do backend.
Resposta: Organizei o backend seguindo a estrutura padrão do NestJS, separando por módulo de funcionalidade. Dentro de src, tenho os arquivos que já vêm do scaffold padrão do Nest (app.module.ts, app.controller.ts, app.service.ts, gerados automaticamente pelo próprio nest new), e a pasta users, que é onde está a funcionalidade pedida no desafio.

Dentro de users, separei em: users.module.ts (o módulo que registra o controller e o service dessa funcionalidade, e é importado pelo app.module.ts, o módulo raiz da aplicação), users.controller.ts (a camada que recebe as requisições HTTP, define as rotas GET /users e POST /users, e só delega pro service, sem lógica de negócio nenhuma dentro dele), users.service.ts (onde fica a lógica real: a lista de usuários em memória e os métodos findAll e create) e dois arquivos de tipagem: dto/create-user.dto.ts (uma classe que descreve e valida o corpo esperado no POST, usando decorators do class-validator: IsString e IsNotEmpty no name, IsEmail no email) e interfaces/user.interface.ts (a interface User, só pra descrever o formato do objeto usuário, sem validação nenhuma).

Também configurei, no main.ts, um ValidationPipe global, que faz o Nest validar automaticamente o corpo de toda requisição contra o DTO correspondente, antes mesmo de chegar no controller. Se o e-mail for inválido ou o nome vier vazio, a requisição já é recusada antes de qualquer lógica minha rodar.

A ideia de separar assim é seguir o princípio de responsabilidade única: controller cuida só de rota e request/response, service cuida só de lógica e estado, DTO cuida só de validação de entrada, e interface só descreve o formato dos dados. Isso deixa cada peça fácil de entender isoladamente e fácil de trocar sem afetar as outras; por exemplo, se amanhã eu trocar o array em memória por um banco de dados real, só preciso mexer no service, o controller nem percebe a diferença.

/Etapa 6
Questao: Explique brevemente sua estratégia de commits (o que você separou em cada um e por quê).
Resposta: Minha estratégia foi separar um commit por etapa concluída, em vez de fazer um único commit final com tudo pronto. Cada commit corresponde a uma tecnologia/desafio diferente, na ordem em que fui implementando:

1. feat: estrutura inicial do projeto e o formulario HTML/CSS
2. feat: to-do list em Vue 3 com Composition API
3. feat: função utilitária de filtro em TypeScript
4. feat: queries SQL de usuários
5. feat: API de usuários em NestJS

A ideia é que cada commit representa um passo completo e funcional do desafio, então quem olhar o histórico consegue acompanhar a evolução real do trabalho, etapa por etapa, em vez de só ver o resultado final sem contexto de como cheguei até ele. Também deixei os arquivos de documentação (README.md, .gitignore, pasta Docs) de fora desses commits de código, porque eles não fazem parte da implementação em si; a ideia é fechar com um commit separado, só de documentação, já que código e documentação têm responsabilidades diferentes e por isso também fazem sentido como commits diferentes.

/Etapa 7 - Imagine que você vai iniciar um projeto fullstack do zero.
Questao 1: Quais pastas e arquivos você criaria para organizar o frontend (Vue 3)?
Resposta: Eu primeiramente inicializaria o projeto Vue 3 com o Vite. Após isso, criaria as pastas: components (armazena os componentes reutilizáveis da aplicação), composables (organiza a lógica de estado da aplicação, separada da apresentação), e assets (já vem criada com o Vite, organiza arquivos estáticos como imagens). Também criaria a pasta views e a pasta router. A view é o que define uma tela inteira (LoginView, por exemplo, exibe a tela de login), e dentro dela a gente pode juntar vários componentes diferentes, que podem ser reaproveitados em outras views também. Já o router serve pra mapear cada URL para a view correspondente (/login, /dashboard, /projetos, etc.), controlando qual tela aparece de acordo com a rota acessada. Por último, a pasta stores, que serviria pra compartilhar estado entre partes distantes da árvore de componentes, sem relação direta entre si (diferente de um composable local, que fica isolado dentro de uma única funcionalidade).

Questao 2: Quais pastas e arquivos você criaria para organizar o backend (NestJS)?
Resposta: Para o NestJS, além das pastas que já vêm padrão, eu organizaria por módulo de funcionalidade, com: controller (organiza quais requisições o sistema aceita e como responde a elas), service (a lógica de negócio de fato, que processa a requisição) e module (que reúne o controller e o service de uma funcionalidade, sendo esse módulo, sim, o que é importado pelo módulo raiz da aplicação). Também teria um dto, se necessário, para validar o corpo das requisições que chegam, e uma pasta de entities, para quando existir um banco de dados real (classes que mapeiam os dados diretamente para tabelas do banco, usando um ORM como TypeORM ou Prisma).

/Etapa 8 - Você está desenvolvendo uma aplicação e percebe que a tela de login está demorando
muito para carregar.
Questao 1: Quais seriam as primeiras verificações que você faria para identificar o problema?
Resposta: Primeiro, olharia a aba Network do DevTools, mas focando no tempo de cada requisição, não só em erros: quanto tempo cada chamada de API está levando (tempo até a primeira resposta, tempo total), o tamanho dos arquivos carregados, e se alguma requisição está bloqueando as outras em vez de rodar em paralelo. Uma tela pode estar lenta mesmo sem erro nenhum (retornando 200 OK), só porque a resposta demora ou o pacote de JavaScript carregado é grande demais. Isso já ajuda a isolar onde está o problema: se os dados da API demoram pra voltar, o problema é no backend; se os dados chegam rápido mas a tela demora pra aparecer, o problema é no frontend (JS pesado demais, imagens não otimizadas, etc). Se for backend, o próximo passo é analisar o tempo que cada parte do código leva pra executar, usando algo como o NestJS Observer ou outra ferramenta de APM (Application Performance Monitor), e, se necessário, rodar um EXPLAIN na query que parece suspeita, pra confirmar se ela é o gargalo.

Questao 2: Cite duas possíveis soluções para melhorar a performance.
Resposta: A primeira, se o gargalo for no frontend: aplicar lazy loading / code splitting, carregando só o JavaScript necessário para a tela de login em vez do pacote inteiro da aplicação de uma vez, além de otimizar imagens não comprimidas, reduzindo o tempo até a tela ficar interativa. A segunda, se o gargalo for no backend: depois de confirmar com o EXPLAIN qual query está lenta, adicionar um índice na coluna usada na busca (por exemplo, no e-mail usado pra fazer login); ou, se for um dado que não muda com frequência, usar cache (Redis, por exemplo) para evitar reprocessar ou reconsultar a mesma coisa a cada requisição.

/Etapa 9 
Questao 1: Quais ferramentas de IA você usou durante este desafio (se usou)?
Resposta: Claude Code, com o modelo Sonnet 5 em esforço High. Toda a minha conversa com ele durante a criação do projeto está documentada no arquivo CONVERSA.md.

Questao 2: Dê um exemplo concreto de um momento em que a IA te ajudou a resolver algo, debugar um erro, ou entender um conceito novo.
Resposta: A IA me ajudou na formulação de um guia de implementação que eu pedi para ela criar, pois assim conseguiríamos fazer as ações separadas, sem gastar muito token e sem inflar todo o contexto dela de uma vez só. Com esse guia de implementação, eu implementei algumas partes, mas grande parte eu delegei para ela implementar, e depois passei validando linha por linha, fazendo um code review para ver se o código estava funcionando e se as lógicas implementadas por ela faziam sentido. Em uma dessas etapas, encontrei um erro numa pasta chamada /test e mandei ela corrigir logo em seguida. Ela também me ajudou a entender os conceitos da aplicação, pois eu não tinha tanta familiaridade com Vue, e consegui aprender muita coisa nesses últimos 2 dias, inclusive lendo a documentação oficial e fazendo o tutorial. Me ajudou também a entender os conceitos de organização de projeto nesses frameworks, coisa que eu não tinha tanta clareza antes.

Questao 3: Você já ouviu falar em MCP (Model Context Protocol) ou em agentes/skills de IA (ex: automações com n8n, agentes customizados, CrewAI)? Se sim, o que você entende sobre isso — mesmo que de forma exploratória, sem nunca ter usado na prática.
Resposta: Sim. Ouço falar e uso diariamente no meu trabalho. Atualmente estou analisando uma solução que envolve entender se existe alguma integração com plataformas de e-commerce que tenha algum MCP disponível para poder implementar. Já usei na prática várias CLIs, como Claude Code, Antigravity CLI, Codex, etc. Uso skills diariamente também, inclusive iria usar uma nesse projeto, chamada spec-kit, mas acabei não usando por não ver necessidade de poluir o projeto, já que é algo pequeno. CrewAI, agentes customizados e automações no n8n eu nunca cheguei a utilizar de fato, mas sei como funcionam e sei projetar um caso de uso necessário.