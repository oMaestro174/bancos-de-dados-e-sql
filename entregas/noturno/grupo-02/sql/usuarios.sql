USE escola_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario  INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(120) NOT NULL,
  email       VARCHAR(120) NOT NULL,
  senha_hash  VARCHAR(255) NOT NULL,
  criado_em   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_usuario_email (email)
) ENGINE=InnoDB;

--  Usuário padrão da coordenação (login da aplicação)
--  E-mail: admin@escola.edu.br
--  Senha : admin123   (armazenada como hash bcrypt)
INSERT INTO usuarios (nome, email, senha_hash)
SELECT 'Coordenação Acadêmica', 'admin@escola.edu.br',
       '$2a$10$Nj2HR40Wxfq7o44v.SRwE.Q.QsaOKVGDMeuiMa/WNMDmKGqnf1IHa'
WHERE NOT EXISTS (
  SELECT 1 FROM usuarios WHERE email = 'admin@escola.edu.br'
);
