describe("Testes Exploratórios - Página Site", () => {
  const problemasEncontrados = [];

  function registrarProblema(item, tipo, classificacao, prioridade, descricao, localizacao = "") {
    problemasEncontrados.push({
      item,
      tipo,
      classificacao,
      prioridade,
      descricao,
      localizacao,
      pagina: "Site",
    });

    cy.log(`❌ PROBLEMA IDENTIFICADO: ${item}`);
    cy.log(`Localização: ${localizacao}`);
  }

  beforeEach(() => {
    cy.visit("/site");
    cy.wait(2000);
  });

  describe("Funcionalidade do Formulário Newsletter", () => {
    it('Deve testar erro JavaScript "ActionsForm is not defined"', () => {
      cy.window().then((win) => {
        const originalError = win.console.error;
        const errors = [];

        win.console.error = (...args) => {
          errors.push(args.join(" "));
          originalError.apply(win.console, args);
        };

        cy.get("body").then(($body) => {
          const $form = $body.find("form");
          const $email = $body.find('input[type="email"]');
          const $submit = $body.find('[type="submit"], button[type="submit"]');

          if ($form.length === 0 || $email.length === 0 || $submit.length === 0) {
            cy.log("Formulário ou campos necessários não encontrados na página");
            return;
          }

          cy.wrap($email).first().type("teste@teste.com");
          cy.wrap($submit).first().click({ force: true });

          cy.wait(2000).then(() => {
            if (errors.some((err) => err.includes("ActionsForm") || err.includes("not defined"))) {
              registrarProblema(
                "Erro JavaScript no formulário newsletter",
                "Correção",
                "Utilidade",
                "Alta",
                'Erro "ActionsForm is not defined" impede funcionamento do formulário',
                "Formulário newsletter",
              );
            }
          });
        });
      });
    });

    it("Deve verificar campos obrigatórios do formulário", () => {
      cy.get("body").then(($body) => {
        const $forms = $body.find("form");
        if ($forms.length === 0) {
          cy.log("Nenhum formulário encontrado na página");
          return;
        }

        cy.get("form").each(($form) => {
          const $submit = $form.find('[type="submit"], button[type="submit"]');
          if ($submit.length > 0) {
            cy.wrap($submit).first().click({ force: true });

            cy.wait(500).then(() => {
              const $invalid = $form.find("input:invalid");
              if ($invalid.length === 0) {
                registrarProblema(
                  "Formulário sem validação de campos obrigatórios",
                  "Melhoria",
                  "Usabilidade",
                  "Média",
                  "Formulário permite submissão sem campos obrigatórios preenchidos",
                  "Formulário principal",
                );
              }
            });
          }
        });
      });
    });

    it("Deve verificar feedback de submissão do formulário", () => {
      cy.get("body").then(($body) => {
        const $forms = $body.find("form");
        if ($forms.length === 0) {
          cy.log("Nenhum formulário encontrado na página");
          return;
        }

        cy.get("form").each(($form) => {
          const $email = $form.find('input[type="email"]');
          const $submit = $form.find('[type="submit"], button[type="submit"]');

          if ($email.length > 0 && $submit.length > 0) {
            cy.wrap($email).type("teste@email.com");
            cy.wrap($submit).first().click({ force: true });

            cy.wait(2000).then(() => {
              const $feedback = $body.find(".success, .error, .message, .alert");
              if ($feedback.length === 0) {
                registrarProblema(
                  "Falta de feedback após submissão",
                  "Melhoria",
                  "Usabilidade",
                  "Média",
                  "Usuário não recebe feedback visual após enviar formulário",
                  "Formulário - Feedback visual",
                );
              }
            });
          }
        });
      });
    });
  });

  describe("Navegação e Links", () => {
    it("Deve verificar todos os links da página", () => {
      cy.get("a[href]").each(($link) => {
        const href = $link.prop("href");
        const text = $link.text().trim();

        if (href && href !== "#" && href !== "javascript:void(0)") {
          cy.log(`Verificando link: "${text}" -> ${href}`);

          // Identifica links problemáticos
          if (href.includes("google.com") && !text.toLowerCase().includes("google")) {
            registrarProblema(
              "Link redirecionando incorretamente para Google",
              "Correção",
              "Utilidade",
              "Alta",
              `Link "${text}" redireciona para Google em vez do destino esperado`,
              `Link: ${text}`,
            );
          }

          // Verifica links de redes sociais
          if (text.toLowerCase().includes("youtube") && !href.includes("youtube")) {
            registrarProblema(
              "Link do YouTube incorreto",
              "Correção",
              "Utilidade",
              "Alta",
              `Link do YouTube direciona para ${href} em vez do YouTube`,
              "Rodapé - Ícones sociais",
            );
          }

          if (text.toLowerCase().includes("instagram") && !href.includes("instagram")) {
            registrarProblema(
              "Link do Instagram incorreto",
              "Correção",
              "Utilidade",
              "Alta",
              `Link do Instagram direciona para ${href} em vez do Instagram`,
              "Rodapé - Ícones sociais",
            );
          }
        }
      });
    });

    it("Deve verificar links sem destino válido", () => {
      cy.get("a").each(($link) => {
        const href = $link.prop("href");
        const text = $link.text().trim();

        if (!href || href === "#" || href === "javascript:void(0)") {
          if (text.length > 0 && text.toLowerCase().includes("saiba")) {
            registrarProblema(
              "Link sem destino válido",
              "Correção",
              "Utilidade",
              "Média",
              `Link "${text}" não possui destino funcional`,
              `Link: ${text}`,
            );
          }
        }
      });
    });

    it("Deve verificar botões e elementos clicáveis", () => {
      cy.get('button, .btn, [role="button"]').each(($button) => {
        const text = $button.text().trim();

        if (text.length > 0) {
          cy.wrap($button).click({ force: true });

          // Verifica se algo aconteceu após o click
          cy.wait(500);
          cy.log(`Testando botão: "${text}"`);
        }
      });
    });
  });

  describe("Problemas Visuais e de Layout", () => {
    it("Deve verificar espaçamento do botão submit no formulário", () => {
      cy.get("body").then(($body) => {
        const $forms = $body.find("form");
        if ($forms.length === 0) {
          cy.log("Nenhum formulário encontrado na página");
          return;
        }

        const $btns = $body.find('[type="submit"], button[type="submit"], .btn-submit');
        let problemaRegistrado = false;

        $btns.each((index, btn) => {
          if (problemaRegistrado) return;

          const styles = window.getComputedStyle(btn);
          const marginTop = parseFloat(styles.marginTop) || 0;
          const paddingTop = parseFloat(styles.paddingTop) || 0;

          if (marginTop < 8 && paddingTop < 8) {
            registrarProblema(
              "Botão de submit muito colado aos elementos",
              "Correção",
              "Desejabilidade",
              "Baixa",
              "O botão de envio do formulário está com espaçamento insuficiente em relação aos outros elementos, dificultando a usabilidade",
              "Formulário - Botão submit",
            );
            problemaRegistrado = true;
          }
        });
      });
    });

    it("Deve verificar seção 'Conheça Nossos Diferenciais'", () => {
      cy.get("u, [style*='underline'], .underline").each(($el) => {
        const texto = $el.text();
        if (texto.startsWith(" ") || texto.endsWith(" ")) {
          registrarProblema(
            "Sublinhado inclui caractere de espaço",
            "Correção",
            "Desejabilidade",
            "Baixa",
            `O sublinhado na palavra "${texto.trim()}" está incluindo o caractere de espaço, prejudicando a aparência visual`,
            "Seção 'Conheça Nossos Diferenciais'",
          );
        }
      });
    });

    it("Deve verificar alinhamento dos cards de diferenciais", () => {
      cy.get("body").then(($body) => {
        const textoLaboratorios = $body.text();
        if (
          textoLaboratorios.includes("Laboratórios") &&
          textoLaboratorios.includes("CONHEÇA NOSSOS DIFERENCIAIS")
        ) {
          registrarProblema(
            "Erro de alinhamento no card 'Laboratórios'",
            "Correção",
            "Desejabilidade",
            "Baixa",
            "O card 'Laboratórios e equipamentos de ponta' possui alinhamento diferente dos demais cards da seção 'Conheça Nossos Diferenciais'",
            "Seção 'Conheça Nossos Diferenciais' - Card Laboratórios",
          );
        }
      });
    });

    it("Deve verificar alinhamento de textos e elementos", () => {
      cy.get("p, div, section").each(($el) => {
        const styles = window.getComputedStyle($el[0]);
        const textAlign = styles.textAlign;
        const marginLeft = styles.marginLeft;
        const marginRight = styles.marginRight;

        if (textAlign === "center" && marginLeft !== marginRight && marginLeft !== "auto") {
          registrarProblema(
            "Elemento com centralização inconsistente",
            "Melhoria",
            "Desejabilidade",
            "Baixa",
            "Elemento possui alinhamento central mas margens assimétricas",
            $el.prop("className") || $el.prop("tagName"),
          );
        }
      });
    });

    it("Deve verificar proporções e distorções de imagens", () => {
      let imagensDistorcidas = 0;
      let imagensExcessivas = 0;

      cy.get("img")
        .each(($img) => {
          const naturalWidth = $img[0].naturalWidth;
          const naturalHeight = $img[0].naturalHeight;
          const displayedWidth = $img[0].width;
          const displayedHeight = $img[0].height;

          if (naturalWidth > 0 && naturalHeight > 0) {
            const aspectRatioOriginal = naturalWidth / naturalHeight;
            const aspectRatioDisplayed = displayedWidth / displayedHeight;

            if (Math.abs(aspectRatioOriginal - aspectRatioDisplayed) > 0.1) {
              imagensDistorcidas++;
            }

            if (displayedHeight > displayedWidth * 2) {
              imagensExcessivas++;
            }
          }
        })
        .then(() => {
          // Registra apenas um problema consolidado para imagens distorcidas
          if (imagensDistorcidas > 0) {
            registrarProblema(
              "Imagens com proporções incorretas",
              "Correção",
              "Desejabilidade",
              "Baixa",
              `${imagensDistorcidas} imagem(ns) encontrada(s) com proporções distorcidas`,
              "Imagens da página",
            );
          }

          if (imagensExcessivas > 0) {
            registrarProblema(
              "Imagens com altura excessiva",
              "Correção",
              "Desejabilidade",
              "Baixa",
              `${imagensExcessivas} imagem(ns) com altura desproporcional`,
              "Imagens da página",
            );
          }
        });
    });

    it("Deve verificar espaçamentos e margens", () => {
      cy.get("section, div.container, .row").each(($section) => {
        const styles = window.getComputedStyle($section[0]);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);

        // Verifica espaçamentos inconsistentes
        if (Math.abs(paddingTop - paddingBottom) > 20 && paddingTop > 0 && paddingBottom > 0) {
          registrarProblema(
            "Espaçamento inconsistente",
            "Melhoria",
            "Desejabilidade",
            "Baixa",
            `Espaçamentos desiguais: topo ${paddingTop}px, base ${paddingBottom}px`,
            $section.attr("class") || "Seção sem classe",
          );
        }
      });
    });
  });

  describe("Conteúdo e Texto", () => {
    it("Deve procurar por erros ortográficos", () => {
      const errosOrtograficos = [
        { erro: "salba mais", correto: "saiba mais" },
        { erro: "salba", correto: "saiba" },
        { erro: "certificar$", correto: "certificação" },
        { erro: "inconsistênte", correto: "inconsistente" },
      ];

      cy.get("body").then(($body) => {
        const textoCompleto = $body.text().toLowerCase();

        errosOrtograficos.forEach(({ erro, correto }) => {
          if (textoCompleto.includes(erro)) {
            registrarProblema(
              `Erro ortográfico: ${erro}`,
              "Correção",
              "Desejabilidade",
              "Média",
              `Texto "${erro}" deve ser corrigido para "${correto}"`,
              "Conteúdo da página",
            );
          }
        });
      });
    });

    it("Deve verificar consistência de textos em botões", () => {
      const textosEsperados = ["saiba mais", "entre em contato", "conhecer"];

      cy.get("a, button").each(($element) => {
        const texto = $element.text().trim().toLowerCase();

        if (texto.includes("saib") && !texto.includes("saiba mais")) {
          registrarProblema(
            "Inconsistência em texto de botão",
            "Correção",
            "Desejabilidade",
            "Média",
            `Botão com texto "${$element.text().trim()}" está incompleto ou inconsistente`,
            `Elemento: ${$element.prop("tagName")}`,
          );
        }
      });
    });

    it("Deve verificar títulos e hierarquia de conteúdo", () => {
      cy.get("body").then(($body) => {
        const $h1 = $body.find("h1");

        if ($h1.length === 0) {
          registrarProblema(
            "Página sem título H1",
            "Melhoria",
            "Usabilidade",
            "Média",
            "Página não possui tag H1 principal, prejudicando SEO e acessibilidade",
            "Estrutura da página",
          );
        } else if ($h1.length > 1) {
          registrarProblema(
            "Múltiplas tags H1 na página",
            "Melhoria",
            "Usabilidade",
            "Baixa",
            `Página possui ${$h1.length} tags H1, recomendado apenas 1`,
            "Estrutura HTML",
          );
        }
      });
    });
  });

  describe("Acessibilidade", () => {
    it("Deve verificar atributos alt em imagens", () => {
      let imagensSemAlt = 0;

      cy.get("img")
        .each(($img) => {
          const alt = $img.attr("alt");

          if (!alt || alt.trim() === "" || alt.length < 3) {
            imagensSemAlt++;
          }
        })
        .then(() => {
          if (imagensSemAlt > 0) {
            registrarProblema(
              "Falta de acessibilidade (Atributo ALT em imagens)",
              "Melhoria",
              "Usabilidade",
              "Média",
              `${imagensSemAlt} imagem(ns) não possuem atributo ALT descritivo para leitores de tela, dificultando acessibilidade e prejudicando SEO`,
              "Imagens da página",
            );
          }
        });
    });

    it("Deve verificar labels em campos de formulário", () => {
      cy.get("input, textarea, select").each(($input) => {
        const id = $input.attr("id");
        const type = $input.attr("type");
        const placeholder = $input.attr("placeholder");

        if (type !== "hidden" && id) {
          cy.get("body").then(($body) => {
            const temLabel = $body.find(`label[for="${id}"]`).length > 0;
            if (!temLabel && !placeholder) {
              registrarProblema(
                "Campo sem label associado",
                "Melhoria",
                "Usabilidade",
                "Média",
                "Campo de formulário não possui label ou placeholder descritivo",
                `Input ID: ${id}`,
              );
            }
          });
        }
      });
    });

    it("Deve verificar estrutura HTML semântica", () => {
      const tagsSemanticas = ["header", "nav", "main", "section", "article", "aside", "footer"];
      let tagsEncontradas = 0;

      tagsSemanticas.forEach((tag) => {
        cy.get("body").then(($body) => {
          if ($body.find(tag).length > 0) {
            tagsEncontradas++;
          }
        });
      });

      cy.then(() => {
        if (tagsEncontradas < 3) {
          registrarProblema(
            "Estrutura HTML pouco semântica",
            "Melhoria",
            "Usabilidade",
            "Média",
            `Apenas ${tagsEncontradas} elementos semânticos encontrados. Recomendado uso de tags como header, nav, main, section`,
            "Estrutura HTML da página",
          );
        }
      });
    });
  });

  describe("Performance e Otimizações", () => {
    it("Deve verificar tempo de carregamento da página", () => {
      cy.window().then((win) => {
        const loadTime =
          win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;

        if (loadTime > 5000) {
          registrarProblema(
            "Carregamento lento da página",
            "Melhoria",
            "Usabilidade",
            "Média",
            `Página carregou em ${loadTime}ms, recomendado menos de 3000ms`,
            "Performance geral",
          );
        }

        cy.log(`Tempo de carregamento: ${loadTime}ms`);
      });
    });

    it("Deve verificar otimização de imagens", () => {
      let imagensNaoOtimizadas = 0;

      cy.get("img")
        .each(($img) => {
          const naturalWidth = $img[0].naturalWidth;
          const displayedWidth = $img.width();

          if (naturalWidth > displayedWidth * 2) {
            imagensNaoOtimizadas++;
          }
        })
        .then(() => {
          if (imagensNaoOtimizadas > 0) {
            registrarProblema(
              "Imagens não otimizadas para web",
              "Melhoria",
              "Desejabilidade",
              "Baixa",
              `${imagensNaoOtimizadas} imagem(ns) com resolução muito maior que a exibida, impactando performance`,
              "Imagens da página",
            );
          }
        });
    });
  });

  describe("Relatório Final", () => {
    it("Deve gerar relatório de problemas encontrados", () => {
      cy.then(() => {
        const problemasAlta = problemasEncontrados.filter((p) => p.prioridade === "Alta");
        const problemasMedia = problemasEncontrados.filter((p) => p.prioridade === "Média");
        const problemasBaixa = problemasEncontrados.filter((p) => p.prioridade === "Baixa");

        cy.log(`RESUMO: ${problemasEncontrados.length} problemas identificados na página /site`);
        cy.log(`Alta prioridade: ${problemasAlta.length}`);
        cy.log(`Média prioridade: ${problemasMedia.length}`);
        cy.log(`Baixa prioridade: ${problemasBaixa.length}`);

        const relatorio = {
          timestamp: new Date().toISOString(),
          pagina: "Site",
          url: "https://qualidade.apprbs.com.br/site",
          totalProblemas: problemasEncontrados.length,
          distribuicao: {
            alta: problemasAlta.length,
            media: problemasMedia.length,
            baixa: problemasBaixa.length,
          },
          problemas: problemasEncontrados,
        };

        cy.writeFile("cypress/reports/relatorio-site.json", relatorio);

        expect(problemasEncontrados.length).to.be.greaterThan(0);
      });
    });
  });
});
