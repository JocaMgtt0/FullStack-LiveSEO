-- 1. Lista todos os usuários, do mais recente para o mais antigo.
-- ORDER BY created_at DESC ordena pela data de criação em ordem decrescente
-- (o registro com a data mais alta/recente aparece primeiro).
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC;

-- 2. (Bônus) Conta quantos usuários foram criados por mês.
-- DATE_FORMAT(created_at, '%Y-%m') reduz a data completa (ex: 2024-02-15) para o
-- mês (ex: 2024-02), descartando o dia.
-- GROUP BY mes agrupa todas as linhas que caíram no mesmo mês em uma única linha.
-- COUNT(*) conta quantas linhas (usuários) existem dentro de cada grupo.
-- ORDER BY mes garante que os meses saiam em ordem cronológica na saída.
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS mes,
  COUNT(*) AS total_usuarios
FROM users
GROUP BY mes
ORDER BY mes;
