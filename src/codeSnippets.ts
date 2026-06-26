import { CodeSnippet } from './types';

export const codeSnippets: CodeSnippet[] = [
  {
    title: 'Método Simples (Criando o Título)',
    description: 'Este método mostra como criar e anexar um título simples diretamente ao body da página usando vanilla JavaScript.',
    code: `// =================================================================
// MÉTODO SIMPLES: Criando e adicionando o título
// =================================================================

// 1. Criamos o elemento de cabeçalho
const tituloElemento = document.createElement('h1');

// 2. Definimos o id e o texto usando a abordagem simples
tituloElemento.id = 'titulo';
tituloElemento.innerText = 'Bem-vindo à nossa Loja Online!';

// 3. Adicionamos o título diretamente ao corpo (body) da página
document.body.appendChild(tituloElemento);`,
    language: 'javascript'
  },
  {
    title: 'Método Complexo (Estrutura do Produto)',
    description: 'Este método demonstra a criação de uma hierarquia de elementos filhos (título, descrição, preço) encapsulados em um container "produto-card" e inseridos no DOM.',
    code: `// =================================================================
// MÉTODO COMPLEXO: Criando o produto e seus elementos filhos
// =================================================================

// 1. Criamos o elemento container principal do produto (uma div)
const produtoContainer = document.createElement('div');
produtoContainer.className = 'produto-card';

// 2. Criamos o elemento para o Nome do Produto (h2)
const produtoNome = document.createElement('h2');
produtoNome.innerText = 'Fone de Ouvido Bluetooth Premium';

// 3. Criamos o elemento para a Descrição do Produto (p)
const produtoDescricao = document.createElement('p');
produtoDescricao.innerText = 'Experimente a liberdade sem fios com cancelamento de ruído ativo e bateria que dura até 30 horas.';

// 4. Criamos o elemento para o Preço (span ou parágrafo)
const produtoPreco = document.createElement('p');
produtoPreco.innerText = 'Preço: R$ 299,90';
produtoPreco.style.fontWeight = 'bold'; // Apenas um toque de estilo para destacar

// 5. Organizando a hierarquia (Anexando os filhos ao container do produto)
produtoContainer.appendChild(produtoNome);
produtoContainer.appendChild(produtoDescricao);
produtoContainer.appendChild(produtoPreco);

// 6. Por fim, adicionamos o produto completo ao body da página
document.body.appendChild(produtoContainer);`,
    language: 'javascript'
  },
  {
    title: 'Estrutura HTML Inicial',
    description: 'O documento HTML básico onde o script de manipulação DOM é carregado.',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Loja Virtual</title>
</head>
<body>

    <script src="script.js"></script>
</body>
</html>`,
    language: 'html'
  }
];
