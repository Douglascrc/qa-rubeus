// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando personalizado para verificar acessibilidade básica
Cypress.Commands.add("checkBasicAccessibility", () => {
  // Verifica se há texto alt em imagens
  cy.get("img").each(($img) => {
    cy.wrap($img).should("have.attr", "alt");
  });

  cy.get('input[type="text"], input[type="email"], input[type="tel"]').each(($input) => {
    const id = $input.attr("id");
    if (id) {
      cy.get(`label[for="${id}"]`).should("exist");
    }
  });
});

// Comando para verificar performance básica
Cypress.Commands.add("checkPageLoad", () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    expect(loadTime).to.be.lessThan(5000);
  });
});

// Comando para verificar links quebrados
Cypress.Commands.add("checkExternalLinks", () => {
  cy.get('a[href^="http"]').each(($link) => {
    const href = $link.prop("href");
    cy.request({
      url: href,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 301, 302]);
    });
  });
});
