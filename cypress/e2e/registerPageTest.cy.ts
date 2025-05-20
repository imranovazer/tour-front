describe("Register page test", () => {
  const generateUniqueEmail = () => {
    const timestamp = Date.now();
    return `testuser${timestamp}@example.com`;
  };
  it("Switch dark mode", () => {
    cy.visit("http://localhost:5173/register");
    cy.get('[data-test="register-title"').contains("Create new account");

    cy.get('[data-test="register-background"').should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );

    cy.get('[data-test="dark-mode-switch"').click();

    cy.get('[data-test="register-background"').should(
      "have.css",
      "background-color",
      "rgb(2, 6, 23)"
    );
  });
  it("Fill the register form with invalid data", () => {
    cy.visit("http://localhost:5173/register");
    cy.get('[data-test="register-name-input"]')
      .find("input")
      .type("someTestUserName");
    cy.get('[data-test="register-email-input"]')
      .find("input")
      .type("imranovazra@gmail.com");
    cy.get('[data-test="register-password-input"]')
      .find("input")
      .type("Azer2002");
    cy.get('[data-test="register-passwordConfirm-input"]')
      .find("input")
      .type("Azer20022");

    cy.get('[data-test="register-submit"]').find("button").click();

    cy.contains(/Unable to register/i);
  });

  it("Fill the register form and register", () => {
    const uniqueEmail = generateUniqueEmail();
    cy.visit("http://localhost:5173/register");
    cy.get('[data-test="register-name-input"]')
      .find("input")
      .type("someTestUserName");
    cy.get('[data-test="register-email-input"]')
      .find("input")
      .type(uniqueEmail);
    cy.get('[data-test="register-password-input"]')
      .find("input")
      .type("Azer2002");
    cy.get('[data-test="register-passwordConfirm-input"]')
      .find("input")
      .type("Azer2002");

    cy.get('[data-test="register-submit"]').find("button").click();

    cy.contains(/You registered successfully/i);
  });
});
