# Análise de Qualidade — Páginas /certificacao e /site

Lista dos problemas encontrados nas páginas de Certificação e Site. Inclui correções, melhorias e bugs que impactam usabilidade, acessibilidade e performance. Principais riscos: links incorretos, formulário retornando 403, falta de elementos semânticos e imagens sem ALT/otimização.

Principais problemas por prioridade

- Alta
  - Formulário retorna 403 ao submeter (impede conversão/contato)
  - Links de conversão/ícones sociais redirecionando para domínios errados
  - Erros que impedem navegação/submissão (JS "ActionsForm is not defined")
- Média
  - Ausência de H1 (SEO / acessibilidade)
  - Muitas imagens sem atributo ALT
  - Inconsistências em links e textos de call-to-action
- Baixa
  - Alinhamentos e espaçamentos inconsistentes (cards, botões)
  - Sublinhado incluindo espaço na palavra "melhor"
  - Imagens não otimizadas / proporções incorretas

Como reproduzir e dados úteis

- Página: https://qualidade.apprbs.com.br/certificacao e /site
- Passos básicos: visitar página, inspecionar Network ao submeter formulário, checar console por erros JS, verificar elementos faltantes (H1, labels, ALT)

---

## Erros encontrados

Página 1 - '/certificação'
Item 01 – Erro ortográfico no botão de ação
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Média
Descrição: Na seção "Outros Cursos, o botão que deveria convidar o usuário a saber mais sobre o curso esta escrito "Salba mais" em vez de "Saiba mais".

Item 02 – Link inconsistênte no rodapé
Tipo: Correção
Classificação: Utilidade
Prioridade: Alta
Descrição: O link no botão 'Quero me certificar' localizado no rodapé redireciona para o google.com, o que é inconsistênte com o restante da página.

Item 03 – Falta de acessibilidade (Atributo ALT em imagens)
Tipo: Melhoria
Classificação: Usabilidade
Prioridade: Média
Descrição: As imagens principais das páginas não possuem o atributo alt preenchido. Isso dificulta a navegação de usuários que utilizam leitores de tela e prejudica o SEO da página. É necessário adicionar descrições textuais para cada elemento visual.

Item 04 – Estrutura hierárquica de HTML inadequada
Tipo: Melhoria
Classificação: Usabilidade
Prioridade: Média
Descrição: Através de testes automatizados, foi identificado que a página de certificação não utiliza tags semânticas essenciais do HTML5.

Item 05 - Erro de consistência de alinhamento de paragráfo
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Na seção onde há o formulário existe um erro no alinhamento do texto em relação ao padrão.

Item 06 - Foto distorcida
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Um pouco abaixo do texto da sessão do formulário há uma foto de uma pessoa com a altura muito maior que o necessário.

item 07 - Campo Telefone no formulário
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Mostra para o usuário a frase 'Preencha este campo' mesmo com o telefone digitado errado, ou seja, com mais digitos que o necessário.

item 08 - Avançar no formulário
Tipo: Correção
Classificação: Utilidade
Prioridade: Alta
Descrição: Mesmo preenchendo os campos no formulário de acordo com o necessário não é possivel avançar no formulário devido a um erro 403.

item 09 - Erro de consistência de alinhamento de paragráfo
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Na seção abaixo de onde há o formulário existe um erro no alinhamento do texto em relação ao padrão novamente parecido com o erro do item 05.

item 10 - Divisor
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: O Divisor não possui os seus elementos centralizados na tela.

item 11 - Ícone de check
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Há erro de posicionamento em um dos icones e outros com tamanhos diferentes.

Item 12 - Erro de redirecionamento da rede social
Tipo: Correção
Classificação: Utilidade
Prioridade: Alta
Descrição: O ícone social do YouTube que deveria redirecionar para o perfil da empresa no YouTube, manda o usuário para o perfil do TikTok.

Item 13 - Erro ortográfico
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Média
Descrição: Na seção 'Outros Cursos' há um erro de consistência, pois nos outros cards está escrito 'Saiba mais', ou pelo menos há essa intenção, enquanto no primeiro card esta escrito apenas 'Saiba'.

Item 14 – Setas não são clicaveis
Tipo: Correção
Classificação: Utilidade
Prioridade: Alta
Descrição: As setas para o usuário saber mais sobre o curso não está funcionando corretamente em nenhum dos cards na seção 'Outros Cursos'.

Item 14 – Erro JavaScript no formulário newsletter
Tipo: Correção
Classificação: Utilidade  
Prioridade: Alta
Descrição: Erro "ActionsForm is not defined". O formulário da página /site não funciona corretamente, impedindo submissão de dados.

Página 2 - '/site'

Item 01 – Sublinhado inclui caractere de espaço
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: O sublinhado na palavra "melhor" está incluindo o caractere de espaço, prejudicando a aparência visual.

Item 02 – Erro de alinhamento no card 'Laboratórios'
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: O card "Laboratórios e equipamentos de ponta" apresenta alinhamento diferente dos demais cards da seção, causando inconsistência visual.

Item 03 – Elemento com centralização inconsistente
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Elemento com alinhamento central apresenta margens assimétricas, resultando em centralização visual incorreta.

Item 04 – Imagens com proporções incorretas
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: 1 imagem encontrada com proporções distorcidas entre dimensões naturais e exibidas.

Item 05 – Imagens com altura excessiva
Tipo: Correção
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: 2 imagens apresentam altura desproporcional em relação ao layout, afetando harmonia visual.

Item 06 – Página sem título H1
Tipo: Melhoria
Classificação: Usabilidade
Prioridade: Média
Descrição: A página não possui tag H1 principal, o que prejudica SEO e acessibilidade.

Item 07 – Falta de acessibilidade (Atributo ALT em imagens)
Tipo: Melhoria
Classificação: Usabilidade
Prioridade: Média
Descrição: 33 imagens não possuem atributo ALT descritivo para leitores de tela, dificultando acessibilidade e prejudicando SEO.

Item 08 – Estrutura HTML pouco semântica
Tipo: Melhoria
Classificação: Usabilidade
Prioridade: Média
Descrição: Foram encontrados 0 elementos semânticos importantes; recomenda-se uso de tags como header, nav, main, section para melhorar semântica e acessibilidade.

Item 09 – Imagens não otimizadas para web
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: 7 imagens com resolução muito maior que a exibida, impactando performance e tempo de carregamento.

Item 10 - Submissão do formulário retorna 403 Forbidden
Tipo: Correção
Classificação: Utilidade
Prioridade: Alta
Descrição: Ao preencher e submeter o formulário (newsletter/contato), o servidor responde com HTTP 403 Forbidden em vez de confirmar submissão. Isso impede que usuários enviem dados e compromete a função de conversão/contato.

Item 11 - Erro de posicionamento dos botões
Tipo: Melhoria
Classificação: Desejabilidade
Prioridade: Baixa
Descrição: Os botões 'INSCREVA-SE AGORA' e o botão 'CONCLUIR' do formulário estão mal posicionados, no primeiro caso muito próximo do texto e no segundo caso, próximo ao campo de telefone do form.

### como executar testes automátizados com o cypress

```bash
    npm run test
```
