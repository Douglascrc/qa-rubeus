describe("Análise de qualidade - página de certificação", () => {
  const problemasEncontrados = [];

  function registrarProblema(item, tipo, classificacao, prioridade, descricao, localizacao = "") {
    problemasEncontrados.push({
      item,
      tipo,
      classificacao,
      prioridade,
      descricao,
      localizacao,
      pagina: "Certificação",
    });

    cy.log(`❌ PROBLEMA IDENTIFICADO: ${item}`);
    cy.log(`Localização: ${localizacao}`);
  }

  beforeEach(() => {
    cy.visit("/certificacao");
    cy.wait(2000);
  });

  it("Análise de Conteúdo Textual", () => {
    cy.get("body").then(($body) => {
      const texto = $body.text();

      if (texto.toLowerCase().includes("salba mais")) {
        registrarProblema(
          "Erro ortográfico 'Salba mais'",
          "Correção",
          "Desejabilidade",
          "Média",
          'Texto "Salba mais" deve ser corrigido para "Saiba mais"',
          "Seção 'Outros Cursos'",
        );
      }

      cy.get("*")
        .contains("Outros Cursos")
        .then(($secao) => {
          const textoSecao = $secao.closest("section, div, article, body").text();
          if (textoSecao.toLowerCase().includes("salba mais")) {
            cy.log("✅ Erro 'Salba mais' encontrado na seção 'Outros Cursos'");
          }
        })
        .then(null, () => {
          cy.log("Seção 'Outros Cursos' não encontrada");
        });
    });
  });

  it("Análise de Links e Navegação", () => {
    const linksProblematicos = [];

    cy.get("a").each(($link) => {
      const href = $link.prop("href");
      const texto = $link.text().trim();

      if (
        texto.toLowerCase().includes("certificar") ||
        texto.toLowerCase().includes("inscrever") ||
        texto.toLowerCase().includes("saiba")
      ) {
        if (href && (href.includes("google.com") || href.includes("example.com"))) {
          registrarProblema(
            "Link de conversão redirecionando para domínio externo",
            "Correção",
            "Utilidade",
            "Alta",
            `Link "${texto}" está redirecionando para ${href} ao invés de página interna`,
            `Link "${texto}"`,
          );
        }

        if (!href || href === "#" || href === "javascript:void(0)") {
          registrarProblema(
            "Link sem destino válido",
            "Correção",
            "Utilidade",
            "Média",
            `Link "${texto}" não possui href funcional`,
            `Link "${texto}"`,
          );
        }
      }
    });
  });

  it("Análise de Acessibilidade", () => {
    cy.get("img").each(($img) => {
      const alt = $img.attr("alt");
      const src = $img.attr("src");

      if (!alt || alt.trim() === "" || alt.trim().length < 3) {
        registrarProblema(
          "Imagem sem descrição ALT adequada",
          "Melhoria",
          "Usabilidade",
          "Média",
          "Imagem não possui atributo ALT descritivo para leitores de tela",
          `Imagem: ${src}`,
        );
      }
    });

    cy.get("input, textarea, select").each(($input) => {
      const tipo = $input.attr("type");
      const id = $input.attr("id");
      const placeholder = $input.attr("placeholder");

      if (tipo !== "hidden" && id) {
        cy.get("body").then(($body) => {
          const temLabel = $body.find(`label[for="${id}"]`).length > 0;
          if (!temLabel && !placeholder) {
            registrarProblema(
              "Campo de formulário sem label",
              "Melhoria",
              "Usabilidade",
              "Média",
              "Campo não possui label associado nem placeholder descritivo",
              `Input ID: ${id}`,
            );
          }
        });
      }
    });
  });

  it("Análise de Estrutura HTML/SEO", () => {
    cy.get("body").then(($body) => {
      const h1Elements = $body.find("h1");

      if (h1Elements.length === 0) {
        registrarProblema(
          "Página sem tag H1 principal",
          "Correção",
          "Usabilidade",
          "Média",
          "Página não possui tag H1 para SEO e estrutura adequada",
          "Estrutura da página",
        );
      } else if (h1Elements.length > 1) {
        registrarProblema(
          "Múltiplas tags H1 na página",
          "Melhoria",
          "Usabilidade",
          "Baixa",
          `Página possui ${h1Elements.length} tags H1, recomendado apenas 1 por página`,
          "Estrutura da página",
        );
      }
    });

    const tagsSemanticos = ["main", "header", "nav", "section", "article", "footer"];
    let elementosEncontrados = 0;

    tagsSemanticos.forEach((tag) => {
      cy.get("body").then(($body) => {
        if ($body.find(tag).length > 0) {
          elementosEncontrados++;
        }
      });
    });

    cy.then(() => {
      if (elementosEncontrados < 3) {
        registrarProblema(
          "Estrutura HTML pouco semântica",
          "Melhoria",
          "Desejabilidade",
          "Baixa",
          `Apenas ${elementosEncontrados} elementos semânticos encontrados. Recomendado usar mais tags como main, header, nav, section`,
          "Estrutura HTML",
        );
      }
    });
  });

  it("Relatório de Qualidade", () => {
    cy.then(() => {
      const problemasAlta = problemasEncontrados.filter((p) => p.prioridade === "Alta");
      const problemasMedia = problemasEncontrados.filter((p) => p.prioridade === "Média");
      const problemasBaixa = problemasEncontrados.filter((p) => p.prioridade === "Baixa");

      cy.log(
        `RESUMO: ${problemasEncontrados.length} problemas identificados na página /certificacao`,
      );
      cy.log(`   🔴 Alta prioridade: ${problemasAlta.length}`);
      cy.log(`   🟡 Média prioridade: ${problemasMedia.length}`);
      cy.log(`   🟢 Baixa prioridade: ${problemasBaixa.length}`);
      cy.log("");

      if (problemasAlta.length > 0) {
        cy.log("🔴 PROBLEMAS DE ALTA PRIORIDADE");
        problemasAlta.forEach((problema, index) => {
          cy.log(`${index + 1}. ${problema.item} - ${problema.pagina}`);
          cy.log(`   Tipo: ${problema.tipo}`);
          cy.log(`   Classificação: ${problema.classificacao}`);
          cy.log(`   Prioridade: ${problema.prioridade}`);
          cy.log(`   Descrição: ${problema.descricao}`);
          cy.log(`   Localização: ${problema.localizacao}`);
          cy.log("");
        });
      }

      if (problemasMedia.length > 0) {
        cy.log("PROBLEMAS DE MÉDIA PRIORIDADE");
        problemasMedia.forEach((problema, index) => {
          cy.log(`${index + 1}. ${problema.item} - ${problema.pagina}`);
          cy.log(`   Tipo: ${problema.tipo}`);
          cy.log(`   Classificação: ${problema.classificacao}`);
          cy.log(`   Prioridade: ${problema.prioridade}`);
          cy.log(`   Descrição: ${problema.descricao}`);
          cy.log(`   Localização: ${problema.localizacao}`);
          cy.log("");
        });
      }

      if (problemasBaixa.length > 0) {
        cy.log("🟢 PROBLEMAS DE BAIXA PRIORIDADE");
        problemasBaixa.forEach((problema, index) => {
          cy.log(`${index + 1}. ${problema.item} - ${problema.pagina}`);
          cy.log(`   Tipo: ${problema.tipo}`);
          cy.log(`   Classificação: ${problema.classificacao}`);
          cy.log(`   Prioridade: ${problema.prioridade}`);
          cy.log(`   Descrição: ${problema.descricao}`);
          cy.log(`   Localização: ${problema.localizacao}`);
          cy.log("");
        });
      }

      const relatorio = {
        timestamp: new Date().toISOString(),
        totalProblemas: problemasEncontrados.length,
        distribuicao: {
          alta: problemasAlta.length,
          media: problemasMedia.length,
          baixa: problemasBaixa.length,
        },
        problemas: problemasEncontrados,
      };

      cy.writeFile("cypress/reports/relatorio-certificacao.json", relatorio);
    });
  });
});
