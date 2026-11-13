# Guia de Execução - Grupo 03 (Vespertino)

Aplicação web integrada para consulta de dados académicos utilizando **React (Vite)**, **Flask (Python)** e **MySQL 8.0**, orquestrada inteiramente via **Docker Compose**. O banco de dados é inicializado e populado automaticamente a partir do script `base/escola_db.sql`.

---

## 📋 Pré-requisitos

Antes de iniciar, é necessário ter instalado na máquina:
* **Windows / macOS:** Docker Desktop
* **Linux:** Docker Engine e Docker Compose V2

Para validar a instalação, execute no terminal:
```bash
docker --version
docker compose version
```

---

## 🚀 Como Executar o Projeto

1. Abra o terminal e navegue até a pasta do Grupo 03:
```bash
cd entregas/vespertino/grupo-03
```

2. Construa as imagens e inicie os serviços em segundo plano:
```bash
docker compose up -d --build
```
*(Nota: Se estiver no Linux e o seu utilizador não for root, adicione `sudo` antes do comando).*

---

## 🌐 Endereços de Acesso

* **Interface Web (Front-end):** [http://localhost:5173](http://localhost:5173)
* **API REST (Back-end):** [http://localhost:5000/api/alunos](http://localhost:5000/api/alunos)

---

## 🛠️ Estrutura de Containers e Portas

| Container | Serviço | Porta no Host | Função |
| :--- | :--- | :---: | :--- |
| `escola_mysql` | MySQL 8.0 | `3306` | Armazenamento persistente e execução do SQL inicial |
| `escola_backend` | Flask API | `5000` | Processamento de regras de negócio e consultas ao banco |
| `escola_frontend` | React | `5173` | Interface gráfica de listagem, busca e filtros de alunos |

---

## 🛑 Gerenciamento e Comandos Úteis

* **Verificar se os containers estão ativos (`Up`):**
```bash
docker ps
```
* **Parar a execução (sem apagar os dados):**
```bash
docker compose stop
```
* **Remover os containers da memória:**
```bash
docker compose down
```
* **Resetar completamente o banco de dados (reexecuta o script SQL inicial):**
```bash
docker compose down -v
```

---

## ⚠️ Resolução de Problemas Rápidos

* **Erro de Porta 3306 ocupada (MySQL local ativo na máquina física):**
  Pare o serviço do MySQL nativo do seu sistema operacional antes de rodar o Docker:
```bash
sudo systemctl stop mysql
```
* **Erro de DNS interno (Unknown MySQL server host):**
  Caso o backend não consiga localizar o container do banco devido a instabilidades de rede do Docker, reinicie o motor do Docker:
```bash
sudo systemctl restart docker
```
* **Alterações no código fonte não aparecem no navegador:**
  Force a reconstrução completa ignorando o cache do Docker:
```bash
docker compose up -d --build
```