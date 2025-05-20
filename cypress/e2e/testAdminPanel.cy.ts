describe("Admin dashboard test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-test="login-email-input"]')
      .find("input")
      .type("admin@mail.ru");
    cy.get('[data-test="login-password-input"]')
      .find("input")
      .type("admin2002");

    cy.get('[data-test="login-submit"]').find("button").click();
  });

  it("Testing navbar links", () => {
    cy.get('[data-test="nav-dashboard"]').should("exist");

    cy.get('[data-test="nav-dashboard"]').click();
    cy.location("pathname").should("equal", "/dashboard");

    cy.visit("http://localhost:5173/dashboard/tours");

    cy.get('[data-test="create-tour-button"]').click();

    cy.get('[data-test="tour-name"]')
      .find("input")
      .type("Tour created for testing");

    cy.get('[data-test="tour-summary"]').find("input").type("Summary for tour");

    cy.get('[data-test="tour-maxGroupSize"]').find("input").type(5);
    cy.get('[data-test="tour-price"]').find("input").type(4000);

    cy.get('[data-test="tour-description"]')
      .find("textarea")
      .type("Description for my newely creaeted tour");

    cy.get('[data-test="tour-difficulty"] .ant-select-selector').click();
    cy.get('[data-test="tour-medium-option"]').click();

    cy.get('[data-test="tour-duration"]').find("input").type(4);

    cy.get("#basic_imageCover").selectFile("cypress/fixtures/image.jpeg", {
      force: true,
    });

    cy.get(".ant-modal-footer button.ant-btn-primary").click();

    cy.visit("http://localhost:5173/tours");

    cy.get("#search-dropdown").type("Tour created for testing");

    cy.contains("Tour created for testing");

    cy.visit("http://localhost:5173/dashboard/tours");

    cy.get('[data-test="tour-delete-button"]').first().click();

    cy.get(".ant-modal-footer button.ant-btn-primary").click();

    cy.contains("Tour deleted successfully!");

    cy.wait(2000);
  });
});
