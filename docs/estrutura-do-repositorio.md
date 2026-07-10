# Estrutura do repositório

## Pastas principais

### `docs/`
Contém os documentos orientadores do projeto, incluindo o documento de solicitação do Product Owner.

### `base/`
Contém o arquivo SQL da base `escola_db` que será utilizada no projeto.

### `entregas/noturno/`
Contém apenas os grupos da turma do noturno.

### `entregas/vespertino/`
Contém apenas os grupos da turma do vespertino.

## Modelo de organização por grupo

Cada grupo pode organizar sua pasta assim:

```text
grupo-01/
├── app/
├── sql/
├── der/
├── docs/
└── infra/
```

## Conteúdo esperado por subpasta

- `app/`: aplicação, front-end, back-end, instruções de execução.
- `sql/`: script do banco, consultas principais e ajustes feitos pelo grupo.
- `der/`: DER em PNG, JPG ou PDF.
- `docs/`: documento da equipe, integrantes e divisão de papéis.
- `infra/`: link de publicação, print da implantação, comandos ou instruções do deploy.
