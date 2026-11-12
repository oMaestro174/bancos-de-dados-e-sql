-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.46 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.22.0.7382
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para escola_db
CREATE DATABASE IF NOT EXISTS `escola_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `escola_db`;

-- Copiando estrutura para tabela escola_db.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matricula` varchar(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_matricula` date NOT NULL,
  `turma_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  UNIQUE KEY `email` (`email`),
  KEY `turma_id` (`turma_id`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.alunos: ~3 rows (aproximadamente)
INSERT INTO `alunos` (`id`, `matricula`, `nome`, `email`, `data_matricula`, `turma_id`) VALUES
	(1, '2026001', 'Ana Silva', 'ana.silva@email.com', '2026-02-10', 1),
	(2, '2026002', 'Carlos Eduardo', 'carlos.eduardo@email.com', '2026-02-11', 1),
	(3, '2026003', 'Mariana Costa', 'mariana.costa@email.com', '2026-02-15', 2);

-- Copiando estrutura para tabela escola_db.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int NOT NULL,
  `nome` varchar(120) NOT NULL,
  `carga_horaria` int NOT NULL,
  `area` varchar(80) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.cursos: ~6 rows (aproximadamente)
INSERT INTO `cursos` (`id_curso`, `nome`, `carga_horaria`, `area`) VALUES
	(1, 'Banco de Dados e SQL', 60, 'Dados'),
	(2, 'Desenvolvimento Web Front-end', 80, 'Desenvolvimento Web'),
	(3, 'Desenvolvimento Web Back-end', 80, 'Desenvolvimento Web'),
	(4, 'Redes de Computadores', 60, 'Infraestrutura'),
	(5, 'Segurança da Informação', 60, 'Segurança'),
	(6, 'Lógica de Programação', 40, 'Programação');

-- Copiando estrutura para tabela escola_db.disciplinas
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.disciplinas: ~2 rows (aproximadamente)
INSERT INTO `disciplinas` (`id`, `nome`) VALUES
	(1, 'Banco de Dados e SQL'),
	(2, 'Desenvolvimento Web');

-- Copiando estrutura para tabela escola_db.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aluno_id` int NOT NULL,
  `disciplina_id` int NOT NULL,
  `nota_1` decimal(4,2) DEFAULT NULL,
  `nota_2` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  KEY `disciplina_id` (`disciplina_id`),
  CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.notas: ~3 rows (aproximadamente)
INSERT INTO `notas` (`id`, `aluno_id`, `disciplina_id`, `nota_1`, `nota_2`) VALUES
	(1, 1, 1, 8.50, 9.00),
	(2, 2, 1, 6.00, 5.50),
	(3, 3, 1, 9.50, 10.00);

-- Copiando estrutura para tabela escola_db.professores
CREATE TABLE IF NOT EXISTS `professores` (
  `id_professor` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `area` varchar(80) NOT NULL,
  PRIMARY KEY (`id_professor`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.professores: ~6 rows (aproximadamente)
INSERT INTO `professores` (`id_professor`, `nome`, `email`, `area`) VALUES
	(1, 'Ana Paula Souza', 'ana.souza@iteam.edu.br', 'Banco de Dados'),
	(2, 'Bruno Lima', 'bruno.lima@iteam.edu.br', 'Programação Web'),
	(3, 'Carla Mendes', 'carla.mendes@iteam.edu.br', 'Redes e Infraestrutura'),
	(4, 'Diego Almeida', 'diego.almeida@iteam.edu.br', 'Engenharia de Software'),
	(5, 'Elaine Costa', 'elaine.costa@iteam.edu.br', 'Segurança da Informação'),
	(6, 'Fernando Rocha', 'fernando.rocha@iteam.edu.br', 'Lógica de Programação');

-- Copiando estrutura para tabela escola_db.turmas
CREATE TABLE IF NOT EXISTS `turmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `ano_letivo` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela escola_db.turmas: ~2 rows (aproximadamente)
INSERT INTO `turmas` (`id`, `nome`, `ano_letivo`) VALUES
	(1, 'Full Stack - Turma A', 2026),
	(2, 'Full Stack - Turma B', 2026);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
