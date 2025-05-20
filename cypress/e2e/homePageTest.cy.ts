describe("Landing page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-test="login-email-input"]')
      .find("input")
      .type("imranovazer@gmail.com");
    cy.get('[data-test="login-password-input"]').find("input").type("Azer2002");

    cy.get('[data-test="login-submit"]').find("button").click();
  });

  it("Testing navbar links", () => {
    cy.get('[data-test="nav-tours"]').click();
    cy.location("pathname").should("equal", "/tours");

    cy.get('[data-test="nav-about"]').click();
    cy.location("pathname").should("equal", "/about");

    cy.get('[data-test="nav-home"]').click();
    cy.location("pathname").should("equal", "/");
    
    cy.scrollTo("bottom", { duration: 3000 });
  });

  it("If dashboard appears for not admin users", () => {
    cy.get('[data-test="nav-dashboard"]').should("not.exist");
  });

  it("Sending email to customer service", () => {
    cy.get('[data-test="send-email-email-input"]').type("testemail@gmail.com");
    cy.get('[data-test="send-email-message-input"]').type("Test message");
    cy.get('[data-test="send-email-button"]').within(() => {
      cy.get("button").click();
    });
    cy.contains(/Message sent successfully/i);
  });
});
