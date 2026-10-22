Convenção de COMMITS
A estrutura dos commits deve ser dividida em três partes(Cabeçalho, Corpo e Rodapé), sendo o cabeçalho a única parte
obrigatória.

Não use pontos finais de frase
Não use maiúsculas no início de frase
Não use espaços entre o tipo e o escopo refact(função)
Use linhas em branco entre as partes

<tipo>(<escopo opcional>): <descrição no imperativo>
<LINHA EM BRANCO>
[corpo opcional contendo o contexto detalhado]
<LINHA EM BRANCO>
[rodapé opcional contendo referências de issues ou quebras de compatibilidade]

CONSULTAR CATÁLOGO DE TIPOS (TAXONOMIA)
PREFIXO

refactor: Uma alteração estrutural de código que não adiciona novas regras de negócio nem corrige bugs
(a definição exata de Fowler)
test: Adição, refatoração ou correção de oráculos de teste (Jest ou JUnit)
chore: Alterações em infraestrutura, ferramentas de build ou arquivos de manifesto
(como atualizar o package.json ou o .gitignore)

Usar a taxonomia do Conventional Commits no título, e o catálogo de Padrões de
Refatoração de Martin Fowler no corpo da mensagem.

Use textos no modo Imperativo Obrigatório: Nunca escreva no passado ("extracted", "renamed").
A regra técnica para validação é que o título do commit deve completar perfeitamente a frase:
"Se aplicado, este commit irá..." (Exemplo: "Se aplicado, este commit irá... extract amount calculation").

Use nos commits o mesmo idioma do código e variáveis.

EXEMPLOS:
-> Extract Function (Extração da lógica de cálculo)

refactor(statement): extract amount calculation for a performance

- Technique: Extract Function
- Isolates the switch-case block that calculates the value of a single play.
- Removes the temporary accumulation logic from the main loop to prepare for polymorphism.

-> Clean Code / Rename Variable

refactor(statement): rename 'perf' variable to 'aPerformance'

- Technique: Rename Variable
- Improves lexical scope clarity and follows the book's naming convention for loop variables.


-> Adição de arquivos e documentos complementares

docs(convention): add information about how to use rules to create a commit
docs(taxonomia): add conventional commits reference file
