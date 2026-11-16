
const pesquisa = document.getElementById('pesquisa');
const filtroTurma = document.getElementById('filtroTurma');
const listaAlunos = document.getElementById('listaAlunos');
const mensagem = document.getElementById('mensagem');

// Carregar as turmas no filtro
async function carregarTurmas() {
    try {
        const resposta = await fetch('/api/turmas');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar turmas');
        }

        const turmas = await resposta.json();

        turmas.forEach(turma => {
            const opcao = document.createElement('option');

            opcao.value = turma.id_turma;
            opcao.textContent = turma.nome_turma;

            filtroTurma.appendChild(opcao);
        });

    } catch (erro) {
        console.error(erro);
        mensagem.textContent = 'Erro ao carregar as turmas.';
    }
}

// Pesquisar alunos
async function carregarAlunos() {
    try {
        const parametros = new URLSearchParams();

        parametros.append('nome', pesquisa.value);
        parametros.append('turma', filtroTurma.value);

        const resposta = await fetch(
            `/api/alunos?${parametros.toString()}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar alunos');
        }

        const alunos = await resposta.json();

        listaAlunos.innerHTML = '';

        mensagem.textContent =
            `${alunos.length} aluno(s) encontrado(s).`;

        if (alunos.length === 0) {
            listaAlunos.innerHTML = `
                <tr>
                    <td colspan="8">Nenhum aluno encontrado.</td>
                </tr>
            `;
            return;
        }

        alunos.forEach(aluno => {
            const linha = document.createElement('tr');

            const data = String(aluno.data_matricula)
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/');

            linha.innerHTML = `
                <td>${escaparHTML(aluno.aluno_nome)}</td>
                <td>${escaparHTML(aluno.aluno_email)}</td>
                <td>${escaparHTML(aluno.nome_turma)}</td>
                <td>${data}</td>
                <td>${Number(aluno.nota1).toFixed(2)}</td>
                <td>${Number(aluno.nota2).toFixed(2)}</td>
                <td>${Number(aluno.nota3).toFixed(2)}</td>
                <td>${Number(aluno.media).toFixed(2)}</td>
            `;

            listaAlunos.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);

        mensagem.textContent = 'Erro ao carregar os alunos.';

        listaAlunos.innerHTML = `
            <tr>
                <td colspan="8">Não foi possível carregar os dados.</td>
            </tr>
        `;
    }
}

// Evitar inserir conteúdo HTML vindo diretamente do banco
function escaparHTML(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

// Atualizar pesquisa quando digitar ou trocar a turma
pesquisa.addEventListener('input', carregarAlunos);
filtroTurma.addEventListener('change', carregarAlunos);

// Iniciar aplicação
async function iniciar() {
    await carregarTurmas();
    await carregarAlunos();
}

iniciar();
