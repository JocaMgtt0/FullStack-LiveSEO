-- Estrutura da tabela `users` usada no desafio, com dados de exemplo (seed)
-- para as queries em queries.sql poderem ser executadas do zero.

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at DATE NOT NULL
);

INSERT INTO users (name, email, created_at) VALUES
  ('Ana', 'ana@email.com', '2024-01-01'),
  ('Pedro', 'pedro@email.com', '2024-02-01'),
  ('Maria', 'maria@email.com', '2024-02-15');
