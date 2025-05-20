describe("Login page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Switch dark mode", () => {
    cy.get('[data-test="login-title"').contains("Sign in please");

    cy.get('[data-test="login-background"').should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );

    cy.get('[data-test="dark-mode-switch"').click();
    cy.get('[data-test="login-background"').should(
      "have.css",
      "background-color",
      "rgb(2, 6, 23)"
    );
  });

  it("Fill the login form with invalid data", () => {
    cy.get('[data-test="login-email-input"]')
      .find("input")
      .type("imranovazra@gmail.com");
    cy.get('[data-test="login-password-input"]').find("input").type("Azer2002");

    cy.get('[data-test="login-submit"]').find("button").click();

    cy.contains(/Incorrect email or password/i);
  });

  it("Fill the login form and login", () => {
    cy.get('[data-test="login-email-input"]')
      .find("input")
      .type("imranovazer@gmail.com");
    cy.get('[data-test="login-password-input"]').find("input").type("Azer2002");

    cy.get('[data-test="login-submit"]').find("button").click();

    cy.contains(/You logged in successfully/i);
  });
});
