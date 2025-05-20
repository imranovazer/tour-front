describe("Cart page logic test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-test="login-email-input"]')
      .find("input")
      .type("imranovazer@gmail.com");
    cy.get('[data-test="login-password-input"]').find("input").type("Azer2002");

    cy.get('[data-test="login-submit"]').find("button").click();
  });

  it("Testing cart adding removing item logic", () => {
    cy.get('[data-test="nav-tours"]').click();
    cy.location("pathname").should("equal", "/tours");

    cy.get('[data-test="tour-add-to-cart"]')
      .first()
      .click()
      .then(() => {
        cy.wait(2000);
        cy.get('[data-test="tour-add-to-cart"]').eq(1).click();
      });

    cy.get('[data-test="nav-cart"]').click();

    cy.get('[data-test="cart-item"]').should("have.length", 2);

    cy.get('[data-test="cart-clear-button"]').first().click();

    cy.get('[data-test="cart-item"]').should("have.length", 1);

    cy.get('[data-test="cart-clear-button"]').first().click();
    cy.get('[data-test="cart-item"]').should("have.length", 0);
    cy.contains(/Cart is empty/i);
  });
});
